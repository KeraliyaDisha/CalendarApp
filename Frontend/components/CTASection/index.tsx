import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="bg-teal-600 text-white py-20">
      <div className="container px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">
          Ready to Transform Your Scheduling?
        </h2>
        <a
          href="/auth/signin"
          className="inline-flex items-center gap-3 bg-white text-teal-600 px-8 py-4 rounded-full hover:bg-teal-50 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Get Started Now
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};

export default CTASection;
