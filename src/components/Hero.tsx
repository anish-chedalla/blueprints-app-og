import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#4A90E2]">
      {/* Custom abstract angular background - no watermarks */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Angular shapes using CSS */}
        <div className="absolute inset-0" style={{
          background: `
            linear-gradient(135deg, transparent 0%, transparent 45%, rgba(99, 161, 234, 0.4) 45%, rgba(99, 161, 234, 0.4) 55%, transparent 55%),
            linear-gradient(-45deg, transparent 0%, transparent 35%, rgba(134, 182, 241, 0.5) 35%, rgba(134, 182, 241, 0.5) 65%, transparent 65%),
            linear-gradient(45deg, transparent 0%, transparent 40%, rgba(74, 144, 226, 0.6) 40%, rgba(74, 144, 226, 0.6) 60%, transparent 60%),
            linear-gradient(-135deg, transparent 0%, transparent 30%, rgba(59, 130, 216, 0.5) 30%, rgba(59, 130, 216, 0.5) 70%, transparent 70%),
            linear-gradient(90deg, rgba(99, 161, 234, 0.3) 0%, rgba(134, 182, 241, 0.4) 50%, rgba(59, 130, 216, 0.3) 100%)
          `
        }} />
        
        {/* Additional angular overlay shapes */}
        <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
          <polygon points="0,0 30%,0 15%,40%" fill="rgba(134, 182, 241, 0.4)" />
          <polygon points="70%,0 100%,0 100%,30%" fill="rgba(99, 161, 234, 0.3)" />
          <polygon points="0,70% 0,100% 25%,100%" fill="rgba(74, 144, 226, 0.4)" />
          <polygon points="80%,100% 100%,100% 100%,85%" fill="rgba(134, 182, 241, 0.35)" />
          <polygon points="40%,30% 60%,30% 50%,60%" fill="rgba(168, 203, 247, 0.25)" />
          <polygon points="20%,60% 35%,80% 25%,90%" fill="rgba(99, 161, 234, 0.3)" />
        </svg>
      </div>

      {/* Animated flowing wave backgrounds */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {/* Horizontal flowing waves */}
        <div 
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
          style={{
            animation: 'flowHorizontal 8s ease-in-out infinite',
            animationDelay: '0s'
          }}
        />
        <div 
          className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
          style={{
            animation: 'flowHorizontalReverse 10s ease-in-out infinite',
            animationDelay: '1s'
          }}
        />
        <div 
          className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
          style={{
            animation: 'flowHorizontal 12s ease-in-out infinite',
            animationDelay: '2s'
          }}
        />
        <div 
          className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
          style={{
            animation: 'flowHorizontalReverse 9s ease-in-out infinite',
            animationDelay: '3s'
          }}
        />
        <div 
          className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
          style={{
            animation: 'flowHorizontal 11s ease-in-out infinite',
            animationDelay: '4s'
          }}
        />
      </div>

      {/* Main content - moved up */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto -mt-20">
        {/* Tagline with staggered slide-up - white text */}
        <h1 
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-up-fade"
          style={{ animationDelay: '0.5s', opacity: 0 }}
        >
          <span className="text-white drop-shadow-lg">
            Your Blueprint
          </span>
          <br />
          <span className="text-white/90 text-4xl md:text-5xl lg:text-6xl font-light drop-shadow-md">
            to Arizona Business
          </span>
        </h1>
        
        <p 
          className="text-xl md:text-2xl text-white/85 mb-12 max-w-2xl mx-auto font-light leading-relaxed animate-slide-up-fade drop-shadow-md"
          style={{ animationDelay: '0.8s', opacity: 0 }}
        >
          Navigate funding, licensing, and resources with intelligent guidance
        </p>
        
        {/* CTA Button */}
        <div 
          className="flex justify-center animate-slide-up-fade"
          style={{ animationDelay: '1.1s', opacity: 0 }}
        >
          <Button 
            size="lg" 
            asChild
            className="text-lg px-10 py-7 bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl group"
          >
            <Link to="/auth" className="flex items-center gap-3">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
