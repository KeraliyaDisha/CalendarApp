import { Calendar, Users, Clock, Share2 } from "lucide-react";

const services = [
  {
    icon: <Calendar className="w-12 h-12 text-teal-600" />,
    title: "Flexible Views",
    description: "Switch between Day, Week, and Month views seamlessly.",
  },
  {
    icon: <Users className="w-12 h-12 text-teal-600" />,
    title: "Event Management",
    description: "Drag, drop, and edit events with intuitive sidebar controls.",
  },
  {
    icon: <Clock className="w-12 h-12 text-teal-600" />,
    title: "Instant Updates",
    description: "Live event modifications reflected instantly across devices.",
  },
  {
    icon: <Share2 className="w-12 h-12 text-teal-600" />,
    title: "About",
    description:
      "Empowering teams and individuals with intuitive, real-time event scheduling.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="container px-4 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Powerful Features
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transform how you plan, collaborate, and manage time with real-time tools.
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
  );
};

export default FeaturesSection;