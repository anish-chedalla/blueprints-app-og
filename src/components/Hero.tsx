import { Button } from "@/components/ui/button";
import blueprintBg from "@/assets/blueprint-bg.jpg";
export const Hero = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  return <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Blueprint Background */}
      <div className="absolute inset-0 -z-10">
        <img src={blueprintBg} alt="Blueprint background" className="w-full h-full object-cover" />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Centered content */}
      <div className="text-center px-4 animate-fade-in max-w-4xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          <span className="text-white">Your </span>
          <span className="text-[#4f94ff]">blueprint</span>
          <span className="text-white"> to AZ business</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          Navigate funding opportunities, loans, and resources for Arizona businesses
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={scrollToContent} className="text-lg">
            Learn More
          </Button>
          <Button size="lg" variant="outline" onClick={() => window.location.href = '/auth'} className="text-lg bg-white/10 text-white border-white/20 hover:bg-white/20">
            Sign In
          </Button>
        </div>
      </div>
    </div>;
};