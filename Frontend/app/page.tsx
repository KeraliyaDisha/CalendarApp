/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  Clock,
  Share2,
  ArrowRight,
  ChevronRight,
  Star,
} from "lucide-react";

const CalendarLandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      icon: <Calendar className="w-12 h-12 text-teal-600" />,
      title: "Flexible Views",
      description: "Switch between Day, Week, and Month views seamlessly.",
    },
    {
      icon: <Users className="w-12 h-12 text-teal-600" />,
      title: "Event Management",
      description:
        "Drag, drop, and edit events with intuitive sidebar controls.",
    },
    {
      icon: <Clock className="w-12 h-12 text-teal-600" />,
      title: "Instant Updates",
      description:
        "Live event modifications reflected instantly across devices.",
    },
    {
      icon: <Share2 className="w-12 h-12 text-teal-600" />,
      title: "About",
      description:
        "Empowering teams and individuals with intuitive, real-time event scheduling.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Project Manager",
      content:
        "This calendar revolutionized how our team coordinates meetings.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Freelancer",
      content: "The best scheduling tool I've ever used. Simple yet powerful.",
      rating: 5,
    },
  ];

  return (
    <div
      className={`min-h-screen bg-gray-50 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Hero Section */}
      <section className="relative flex items-center justify-center py-32 bg-gradient-to-br from-teal-600 via-teal-500 to-teal-400">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center px-6 sm:px-12 lg:px-20 max-w-5xl">
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight text-white">
            Revolutionize Your <span className="text-teal-100">Schedule</span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            A smart calendar platform for effortless personal and professional
            scheduling. Manage your events with a simple, real-time solution
            designed to boost productivity.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="/auth/signin"
              className="group flex items-center justify-center gap-3 bg-white text-teal-600 px-8 py-4 rounded-full hover:bg-teal-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/aboutus"
              className="flex items-center justify-center gap-3 bg-teal-700/30 text-white px-8 py-4 rounded-full hover:bg-teal-700/40 transition-all duration-300 backdrop-blur-sm"
            >
              About US
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Designed to transform how you plan, collaborate, and manage your
            time with intuitive tools and real-time synchronization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
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
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
    </div>
  );
};

export default CalendarLandingPage;
