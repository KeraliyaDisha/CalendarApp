"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Project Manager",
    content:
      "Calendo transformed how our team collaborates. Scheduling is now effortless!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Freelancer",
    content:
      "The best scheduling tool I've ever used! Simple, efficient, and powerful.",
    rating: 5,
  },
  {
    name: "Emily Davis",
    role: "Marketing Lead",
    content:
      "I love how intuitive and fast Calendo is! It saves me hours every week.",
    rating: 4,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="bg-gray-100 py-24">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        {/* Title */}
        <motion.h2
          className="text-4xl font-bold text-gray-900 text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What Our Users Say
        </motion.h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:-translate-y-2 flex flex-col items-center text-center"
              whileHover={{ scale: 1.03 }}
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 italic">
                &quot;{testimonial.content}&quot;
              </p>

              {/* User Details */}
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-gray-600">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
