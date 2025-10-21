import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Starting federal grant sync from Grants.gov API...');

    // Call Grants.gov Search2 API
    const apiUrl = 'https://api.grants.gov/v1/api/search2';
    const requestBody = {
      rows: 100,
      keyword: 'Arizona',
      oppStatuses: 'posted',
      fundingCategories: '',
      agencies: ''
    };

    console.log('Calling Grants.gov API with body:', requestBody);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Grants.gov API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Received ${data.oppHits?.length || 0} grants from API`);

    let recordsAffected = 0;

    // Process each grant opportunity
    if (data.oppHits && Array.isArray(data.oppHits)) {
      for (const oppHit of data.oppHits) {
        const oppStatus = oppHit.oppStatus === 'posted' ? 'OPEN' : 'CLOSED';
        const grantData = {
          type: 'GRANT' as const,
          level: 'FEDERAL' as const,
          name: oppHit.title || 'Untitled Grant',
          sponsor: oppHit.agencyName || 'Unknown Agency',
          state: 'AZ',
          url: `https://www.grants.gov/web/grants/view-opportunity.html?oppId=${oppHit.id}`,
          description: oppHit.description || null,
          industry_tags: oppHit.fundingCategories ? [oppHit.fundingCategories] : [],
          demographics: [],
          min_amount: null,
          max_amount: null,
          deadline: oppHit.closeDate ? new Date(oppHit.closeDate).toISOString() : null,
          rolling: false,
          status: oppStatus as 'OPEN' | 'CLOSED',
        };

        // Check if program already exists by URL
        const { data: existingProgram } = await supabase
          .from('programs')
          .select('id')
          .eq('url', grantData.url)
          .maybeSingle();

        if (existingProgram) {
          // Update existing program
          const { error: updateError } = await supabase
            .from('programs')
            .update(grantData)
            .eq('id', existingProgram.id);

          if (updateError) {
            console.error('Error updating grant:', updateError);
          } else {
            recordsAffected++;
          }
        } else {
          // Insert new program
          const { error: insertError } = await supabase
            .from('programs')
            .insert([grantData]);

          if (insertError) {
            console.error('Error inserting grant:', insertError);
          } else {
            recordsAffected++;
          }
        }
      }
    }

    console.log(`Successfully processed ${recordsAffected} grants`);

    // Log sync metadata
    const { error: metadataError } = await supabase
      .from('sync_metadata')
      .insert([{
        sync_type: 'grants',
        records_synced: recordsAffected,
        status: 'success',
      }]);

    if (metadataError) {
      console.error('Failed to log sync metadata:', metadataError);
    }

    // Get the latest sync timestamp
    const { data: syncData } = await supabase
      .from('sync_metadata')
      .select('last_synced, records_synced')
      .eq('sync_type', 'grants')
      .order('last_synced', { ascending: false })
      .limit(1)
      .single();

    return new Response(
      JSON.stringify({
        success: true,
        recordsSynced: recordsAffected,
        lastSynced: syncData?.last_synced,
        message: 'Federal grant data updated successfully',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error syncing grants:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    // Log error to sync_metadata
    try {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      await supabase
        .from('sync_metadata')
        .insert([{
          sync_type: 'grants',
          records_synced: 0,
          status: 'error',
          error_message: errorMessage,
        }]);
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }

    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
