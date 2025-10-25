import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80">
      {/* Animated map pins background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary-foreground))" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(var(--primary-foreground))" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Arizona pins - appear first */}
          {[
            { x: 20, y: 50, delay: 0 },
            { x: 25, y: 55, delay: 0.1 },
            { x: 22, y: 58, delay: 0.2 },
            { x: 18, y: 52, delay: 0.15 },
          ].map((pin, i) => (
            <motion.g
              key={`az-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: pin.delay + 0.5 }}
            >
              <circle cx={`${pin.x}%`} cy={`${pin.y}%`} r="20" fill="url(#pinGlow)" />
              <circle cx={`${pin.x}%`} cy={`${pin.y}%`} r="4" fill="hsl(var(--primary-foreground))" />
            </motion.g>
          ))}
          
          {/* National pins - ripple out */}
          {[
            { x: 50, y: 30, delay: 0.3 },
            { x: 60, y: 40, delay: 0.4 },
            { x: 40, y: 35, delay: 0.35 },
            { x: 70, y: 50, delay: 0.5 },
            { x: 80, y: 45, delay: 0.6 },
            { x: 30, y: 25, delay: 0.45 },
            { x: 45, y: 60, delay: 0.55 },
            { x: 55, y: 65, delay: 0.65 },
          ].map((pin, i) => (
            <motion.g
              key={`nat-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: pin.delay + 0.8 }}
            >
              <circle cx={`${pin.x}%`} cy={`${pin.y}%`} r="15" fill="url(#pinGlow)" />
              <circle cx={`${pin.x}%`} cy={`${pin.y}%`} r="3" fill="hsl(var(--primary-foreground))" opacity="0.8" />
            </motion.g>
          ))}
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4"
        >
          <span className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
            Blueprints
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="text-primary-foreground drop-shadow-lg">
            Find funding for your small business
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl md:text-2xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md"
        >
          One place to search federal and local grants, loans, and incentives
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button 
            size="lg" 
            asChild
            className="text-lg px-10 py-7 bg-background text-foreground hover:bg-background/90 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group"
          >
            <Link to="/grants" className="flex items-center gap-3">
              Find grants
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            asChild
            className="text-lg px-10 py-7 bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 hover:border-primary-foreground transition-all duration-300"
          >
            <Link to="/grants?industry=true">
              Browse by industry
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
