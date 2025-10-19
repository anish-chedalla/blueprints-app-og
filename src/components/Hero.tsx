import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-business.jpg";

export const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "var(--gradient-hero)",
        }}
      />

      {/* Hero Image with Overlay */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <img
          src={heroImage}
          alt="Arizona business district"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      {/* Animated Blueprint Lines */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="blueprint" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="currentColor" className="text-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprint)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Start and fund your{" "}
              <span className="text-primary">Arizona business</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              Find grants, match to loans, and track deadlines in one place.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild size="lg" className="text-lg h-14 px-8 shadow-lg hover:shadow-xl transition-all">
              <Link to="/grants" className="flex items-center gap-2">
                Browse Grants
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg h-14 px-8 border-2 hover:bg-primary/5">
              <Link to="/loans" className="flex items-center gap-2">
                Browse Loans
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-8 pt-8 text-sm text-muted-foreground">
            <div>
              <div className="text-2xl font-bold text-foreground">50+</div>
              <div>Programs</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">$10M+</div>
              <div>Available Funding</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">100%</div>
              <div>Arizona Focused</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
