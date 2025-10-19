import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ValueRow = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Find grants, match to loans, and track deadlines in one place
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything Arizona small businesses need to secure funding and grow
          </p>
        </div>
      </div>
    </section>
  );
};

const StatsRow = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Programs</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">$10M+</div>
            <div className="text-muted-foreground">Available Funding</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground">Arizona Focused</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > window.innerHeight * 0.5;
      setShowHeader(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header that appears on scroll */}
      <div 
        className={`fixed top-0 w-full z-50 transition-transform duration-300 ${
          showHeader ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Navbar />
      </div>

      {/* Full-screen hero */}
      <Hero />

      {/* CTAs appear after scroll */}
      <CTASection />
      
      {/* Value proposition */}
      <ValueRow />
      
      {/* Stats */}
      <StatsRow />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
