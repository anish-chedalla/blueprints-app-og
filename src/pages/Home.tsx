import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Heart, Bell, CheckCircle2, TrendingUp, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Tell us about your business",
      description: "Quick onboarding to understand your needs and match you with the best programs.",
    },
    {
      icon: Heart,
      title: "Find grants and loans",
      description: "Browse curated funding opportunities specific to Arizona businesses.",
    },
    {
      icon: Bell,
      title: "Track deadlines",
      description: "Never miss an opportunity with automated reminders and deadline tracking.",
    },
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes and discover funding opportunities tailored to your business
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center" style={{ boxShadow: "var(--shadow-card)" }}>
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/onboarding">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: CheckCircle2,
      title: "Curated Programs",
      description: "Hand-picked grants and loans specifically for Arizona small businesses.",
    },
    {
      icon: TrendingUp,
      title: "Smart Matching",
      description: "AI-powered recommendations based on your business profile.",
    },
    {
      icon: Shield,
      title: "Always Up-to-Date",
      description: "Real-time updates on program availability and deadline changes.",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="space-y-3">
              <feature.icon className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="border-t py-12 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Blueprints</h3>
            <p className="text-sm text-muted-foreground">
              Your Arizona small business funding companion.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Programs</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/grants" className="hover:text-primary transition-colors">Grants</Link></li>
              <li><Link to="/loans" className="hover:text-primary transition-colors">Loans</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Tools</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link to="/licensing" className="hover:text-primary transition-colors">Licensing</Link></li>
              <li><Link to="/assistant" className="hover:text-primary transition-colors">Assistant</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Blueprints. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Footer />
    </div>
  );
}
