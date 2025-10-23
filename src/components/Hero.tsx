import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import blueprintsIcon from "@/assets/blueprints-icon.png";
import abstractBg from "@/assets/abstract-blue-bg.png";

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
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent"
          style={{
            animation: 'flowHorizontal 8s ease-in-out infinite',
            animationDelay: '0s'
          }}
        />
        <div 
          className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
          style={{
            animation: 'flowHorizontalReverse 10s ease-in-out infinite',
            animationDelay: '1s'
          }}
        />
        <div 
          className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent"
          style={{
            animation: 'flowHorizontal 12s ease-in-out infinite',
            animationDelay: '2s'
          }}
        />
        <div 
          className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
          style={{
            animation: 'flowHorizontalReverse 9s ease-in-out infinite',
            animationDelay: '3s'
          }}
        />
        <div 
          className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
          style={{
            animation: 'flowHorizontal 11s ease-in-out infinite',
            animationDelay: '4s'
          }}
        />
      </div>

      {/* Blueprint grid lines - subtle sketch effect */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="blueprint-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-accent/30"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
        
        {/* Animated blueprint sketch lines */}
        <path
          d="M 0 100 Q 200 50 400 100 T 800 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-accent"
          strokeDasharray="1000"
          style={{
            animation: 'drawLine 4s ease-in-out infinite',
            animationDelay: '0s'
          }}
        />
        <path
          d="M 100 200 Q 300 150 500 200 T 900 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-accent"
          strokeDasharray="1000"
          style={{
            animation: 'drawLine 5s ease-in-out infinite',
            animationDelay: '1s'
          }}
        />
        <path
          d="M 200 400 Q 400 350 600 400 T 1000 400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-accent"
          strokeDasharray="1000"
          style={{
            animation: 'drawLine 6s ease-in-out infinite',
            animationDelay: '2s'
          }}
        />
      </svg>

      {/* Soft ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main content with entrance animations */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Logo with proper padding inside circle */}
        <div className="mb-16 flex justify-center animate-logo-glow">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl flex items-center justify-center p-8 bg-[#5BA3E8]">
            <img 
              src={blueprintsIcon} 
              alt="Blueprints Icon" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
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
