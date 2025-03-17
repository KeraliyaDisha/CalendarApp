import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Project Manager",
    content: "This calendar revolutionized how our team coordinates meetings.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Freelancer",
    content: "The best scheduling tool I've ever used. Simple yet powerful.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="bg-teal-50 py-24">
      <div className="container px-4">
        <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-md">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                &quot;{testimonial.content}&quot;
              </p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
