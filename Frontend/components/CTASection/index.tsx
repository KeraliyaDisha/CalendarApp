import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="bg-gradient-to-br from-gray-700 to-gray-500 text-white py-24">
      <div className="container px-6 text-center max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl font-extrabold mb-4 leading-tight">
          Take Control of Your Time Today
        </h2>
        <p className="text-lg text-gray-200 mb-10">
          Join thousands of professionals who trust <span className="font-semibold">Calendo</span> for smarter scheduling and seamless collaboration.
        </p>

        {/* Button */}
        <a
          href="/auth/signin"
          className="inline-flex items-center gap-3 bg-white text-gray-600 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:bg-gray-100 hover:scale-105"
        >
          Get Started Free
          <ArrowRight className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
};

export default CTASection;
