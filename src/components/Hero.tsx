import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary via-primary/95 to-primary/90">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Centered minimal content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 stagger-1">
          <span className="bg-gradient-to-r from-white via-white to-accent/90 bg-clip-text text-transparent">
            Your Blueprint
          </span>
          <br />
          <span className="text-white/90 text-5xl md:text-6xl lg:text-7xl">
            to Arizona Business
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto font-light leading-relaxed stagger-2">
          Navigate funding, licensing, and resources with intelligent guidance
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center stagger-3">
          <Button 
            size="lg" 
            asChild
            className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-xl group"
          >
            <Link to="/auth" className="flex items-center gap-2">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
          <div className="w-1.5 h-3 bg-white/50 rounded-full mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
};