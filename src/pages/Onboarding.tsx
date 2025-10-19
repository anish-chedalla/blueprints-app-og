import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const INDUSTRIES = ["technology", "retail", "services", "food service", "sustainability", "biotech"];
const DEMOGRAPHICS = ["women_owned", "veteran_owned", "minority_owned"];

export default function Onboarding() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: "",
    city: "",
    county: "",
    employees: "",
    industryTags: [] as string[],
    demographics: [] as string[],
  });

  const toggleTag = (tag: string, field: "industryTags" | "demographics") => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(tag) ? prev[field].filter(t => t !== tag) : [...prev[field], tag]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast.error("Please sign in first");
      navigate("/auth");
      return;
    }

    try {
      const { error } = await supabase.from("profiles").upsert({
        user_id: session.user.id,
        business_name: formData.businessName,
        city: formData.city,
        county: formData.county,
        employees: parseInt(formData.employees) || null,
        industry_tags: formData.industryTags,
        demographics: formData.demographics,
      });

      if (error) throw error;
      toast.success("Profile saved!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to save profile");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Tell us about your business</CardTitle>
            <CardDescription>This helps us match you with the best programs</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label>Business Name</Label>
                <Input value={formData.businessName} onChange={(e) => setFormData({...formData, businessName: e.target.value})} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>City</Label>
                  <Input value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                </div>
                <div>
                  <Label>County</Label>
                  <Input value={formData.county} onChange={(e) => setFormData({...formData, county: e.target.value})} />
                </div>
              </div>
              <div>
                <Label>Number of Employees</Label>
                <Input type="number" value={formData.employees} onChange={(e) => setFormData({...formData, employees: e.target.value})} />
              </div>
              <div>
                <Label>Industries</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {INDUSTRIES.map(tag => (
                    <Badge key={tag} variant={formData.industryTags.includes(tag) ? "default" : "outline"} className="cursor-pointer" onClick={() => toggleTag(tag, "industryTags")}>{tag}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label>Business Type</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {DEMOGRAPHICS.map(tag => (
                    <Badge key={tag} variant={formData.demographics.includes(tag) ? "default" : "outline"} className="cursor-pointer" onClick={() => toggleTag(tag, "demographics")}>{tag.replace(/_/g, " ")}</Badge>
                  ))}
                </div>
              </div>
              <Button type="submit" className="w-full">Complete Setup</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
