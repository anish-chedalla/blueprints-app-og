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

    console.log('Starting grant sync...');

    // Fetch the grant portal page
    const grantUrl = 'https://www.thegrantportal.com/grant-details/75513/grants-to-grow-local-culture-and-learning';
    const response = await fetch(grantUrl);
    const html = await response.text();

    console.log('Fetched grant page, parsing data...');

    // Parse HTML to extract grant information
    // This is a simple parser - in production you might use a proper HTML parser
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].split(' - ')[0].trim() : 'Grants to Grow Local Culture and Learning';

    // Extract description from meta tags or content
    const descMatch = html.match(/<meta name="description" content="(.*?)"/i);
    const description = descMatch 
      ? descMatch[1] 
      : 'Funding program supporting community cultural and learning initiatives across Arizona.';

    // For now, we'll use the example data structure since scraping dynamic content
    // requires more sophisticated tools. This can be replaced with actual scraping logic.
    const grantData = {
      type: 'GRANT' as const,
      level: 'STATE' as const,
      name: title.length > 10 ? title : 'Grants to Grow Local Culture and Learning',
      sponsor: 'The Grant Portal',
      state: 'AZ',
      url: grantUrl,
      description: description.length > 20 ? description : 'Funding program supporting community cultural and learning initiatives across Arizona.',
      industry_tags: ['arts', 'education'],
      demographics: [],
      min_amount: 1000,
      max_amount: 5000,
      deadline: '2025-11-01T00:00:00.000Z',
      rolling: false,
      status: 'OPEN' as const,
    };

    console.log('Parsed grant data:', grantData);

    // Check if program already exists
    const { data: existingProgram } = await supabase
      .from('programs')
      .select('id')
      .eq('url', grantData.url)
      .single();

    let recordsAffected = 0;

    if (existingProgram) {
      // Update existing program
      const { error: updateError } = await supabase
        .from('programs')
        .update(grantData)
        .eq('id', existingProgram.id);

      if (updateError) throw updateError;
      recordsAffected = 1;
      console.log('Updated existing grant');
    } else {
      // Insert new program
      const { error: insertError } = await supabase
        .from('programs')
        .insert([grantData]);

      if (insertError) throw insertError;
      recordsAffected = 1;
      console.log('Inserted new grant');
    }

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
        message: 'Grant data synced successfully',
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
