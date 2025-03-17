import { ChevronRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative flex items-center justify-center py-32 bg-gradient-to-br from-teal-600 via-teal-500 to-teal-400">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="relative z-10 text-center px-6 sm:px-12 lg:px-20 max-w-5xl">
        <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight text-white">
          Revolutionize Your <span className="text-teal-100">Schedule</span>
        </h1>
        <p className="text-xl lg:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed">
          A smart calendar platform for effortless personal and professional
          scheduling. Manage your events with a simple, real-time solution.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* Get Started Button with Hover Effects */}
          <a
            href="/auth/signin"
            className="group flex items-center justify-center gap-3 bg-white text-teal-600 px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl 
            hover:bg-teal-100 hover:scale-105"
          >
            Get Started
            <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
          </a>

          {/* About Us Button with Hover Effects */}
          <a
            href="/aboutus"
            className="flex items-center justify-center gap-2 bg-teal-700/30 text-white px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-sm 
            hover:bg-teal-700/50 hover:scale-105 hover:shadow-lg border-white border"
          >
            About Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
