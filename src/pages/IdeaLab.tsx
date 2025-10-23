import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lightbulb, Sparkles, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function IdeaLab() {
  const [businessIdea, setBusinessIdea] = useState("");
  const [industry, setIndustry] = useState("");
  const [budget, setBudget] = useState("");

  const handleAnalyze = () => {
    if (!businessIdea.trim()) {
      toast.error("Please describe your business idea");
      return;
    }
    toast.success("Analysis coming soon! We're building this feature.");
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 animate-scale-in">
              <Lightbulb className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Idea Lab</h1>
            <p className="text-xl text-muted-foreground">
              Validate your business idea and discover the best funding opportunities
            </p>
          </div>

          {/* Main Form */}
          <Card className="mb-8 stagger-1 hover-lift">
            <CardHeader>
              <CardTitle>Tell us about your business idea</CardTitle>
              <CardDescription>
                Describe your concept and we'll help you find matching grants and loans
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="idea">Business Idea Description</Label>
                <Textarea
                  id="idea"
                  placeholder="Example: I want to start a sustainable coffee shop in Phoenix that sources beans from local roasters and uses eco-friendly packaging..."
                  value={businessIdea}
                  onChange={(e) => setBusinessIdea(e.target.value)}
                  rows={6}
                  className="resize-none transition-all duration-200 focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    placeholder="e.g., Food Service, Technology"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Estimated Startup Budget</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="e.g., 50000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <Button onClick={handleAnalyze} className="w-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg" size="lg">
                <Sparkles className="mr-2 h-5 w-5" />
                Analyze Idea & Find Funding
              </Button>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="stagger-2 hover-lift transition-all duration-300">
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Market Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get insights into market demand, competition, and growth potential for your business idea
                </p>
              </CardContent>
            </Card>

            <Card className="stagger-3 hover-lift transition-all duration-300">
              <CardHeader>
                <Sparkles className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Funding Matches</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Discover grants and loans specifically designed for businesses like yours
                </p>
              </CardContent>
            </Card>

            <Card className="stagger-4 hover-lift transition-all duration-300">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Expert Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Receive tailored recommendations and next steps to turn your idea into reality
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
