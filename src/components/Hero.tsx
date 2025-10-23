import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import blueprintsIcon from "@/assets/blueprints-icon.png";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(210, 70%, 48%) 0%, hsl(210, 75%, 52%) 50%, hsl(210, 68%, 50%) 100%)' }}>
      
      {/* Abstract geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 border-4 border-white/10 rounded-full" />
        <div className="absolute top-1/4 -right-48 w-[500px] h-[500px] border-4 border-white/5 rounded-full" />
        <div className="absolute -bottom-40 left-1/4 w-80 h-80 border-4 border-white/8 rounded-full" />
        
        {/* Floating squares and rectangles */}
        <div className="absolute top-20 left-1/4 w-32 h-32 border-2 border-white/10 rotate-45 rounded-lg" />
        <div className="absolute bottom-40 right-1/4 w-48 h-24 border-2 border-white/8 -rotate-12 rounded-lg" />
        <div className="absolute top-2/3 left-12 w-24 h-24 border-2 border-white/12 rotate-12 rounded-lg" />
        
        {/* Triangular shapes */}
        <svg className="absolute top-1/3 right-20 w-40 h-40 opacity-10" viewBox="0 0 100 100">
          <polygon points="50,10 90,90 10,90" fill="none" stroke="white" strokeWidth="2"/>
        </svg>
        <svg className="absolute bottom-1/4 left-1/3 w-32 h-32 opacity-8" viewBox="0 0 100 100">
          <polygon points="50,10 90,90 10,90" fill="none" stroke="white" strokeWidth="2"/>
        </svg>
        
        {/* Compass/drafting tool inspired shapes */}
        <svg className="absolute top-40 right-1/3 w-24 h-24 opacity-10" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="2"/>
          <line x1="50" y1="20" x2="50" y2="80" stroke="white" strokeWidth="2"/>
          <line x1="20" y1="50" x2="80" y2="50" stroke="white" strokeWidth="2"/>
        </svg>
        
        {/* Ruler marks */}
        <div className="absolute top-0 left-1/2 h-full flex flex-col justify-around opacity-5">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-8 h-px bg-white" />
          ))}
        </div>
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
        {/* Logo with glow animation and light blue background */}
        <div className="mb-16 flex justify-center animate-logo-glow">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center shadow-2xl" style={{ background: 'hsl(210, 75%, 58%)' }}>
            <img 
              src={blueprintsIcon} 
              alt="Blueprints Icon" 
              className="w-48 h-48 md:w-60 md:h-60 object-contain"
            />
          </div>
        </div>
        
        {/* Tagline with staggered slide-up */}
        <h1 
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-up-fade"
          style={{ animationDelay: '0.5s', opacity: 0 }}
        >
          <span className="bg-gradient-to-r from-white via-white to-accent/90 bg-clip-text text-transparent">
            Your Blueprint
          </span>
          <br />
          <span className="text-white/90 text-4xl md:text-5xl lg:text-6xl font-light">
            to Arizona Business
          </span>
        </h1>
        
        <p 
          className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed animate-slide-up-fade"
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
