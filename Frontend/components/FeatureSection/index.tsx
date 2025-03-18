import { Calendar, Users, Clock, Share2 } from "lucide-react";

const services = [
  {
    icon: <Calendar className="w-14 h-14 text-gray-600" />,
    title: "Smart Scheduling",
    description: "Plan your events effortlessly with daily, weekly, and monthly views.",
  },
  {
    icon: <Users className="w-14 h-14 text-gray-600" />,
    title: "Seamless Event Management",
    description: "Create, edit, and manage events with an intuitive drag-and-drop feature.",
  },
  {
    icon: <Clock className="w-14 h-14 text-gray-600" />,
    title: "Real-Time Sync",
    description: "Instant updates across all your devices for seamless coordination.",
  },
  {
    icon: <Share2 className="w-14 h-14 text-gray-600" />,
    title: "Collaboration Made Easy",
    description: "Share your calendar with teams and schedule meetings effortlessly.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features to Boost Productivity
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Unlock the full potential of smart scheduling and collaboration with our feature-rich platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:-translate-y-2 flex flex-col items-center min-h-[250px]"
            >
              <div className="mb-5 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
