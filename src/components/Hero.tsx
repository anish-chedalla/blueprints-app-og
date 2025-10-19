import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-business.jpg";

export const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Full-screen Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImage}
          alt="Arizona business district"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Centered motto text */}
      <div className="text-center px-4 animate-fade-in">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white">
          Your map to AZ business
        </h1>
      </div>

      {/* Scroll cue at bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-white/80" />
      </div>
    </div>
  );
};
