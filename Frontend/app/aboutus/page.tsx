import React from "react";

const teamMembers = [{ name: "Nish Patel" }];

const AboutUs: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          About Us
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Welcome to{" "}
          <span className="text-[#00b5b8] font-semibold">Calendo</span>, where
          organization meets innovation. Our mission is to revolutionize the way
          individuals and businesses manage their time, providing an intuitive
          and powerful calendar solution that enhances productivity and
          collaboration.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mt-6">
          Meet Our Team
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-gray-50 p-4 rounded-lg shadow-md"
            >
              <h4 className="mt-3 text-lg font-semibold text-gray-800">
                {member.name}
              </h4>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-semibold text-gray-700 mt-6">Contact Us</h3>
        <p className="text-gray-600 mt-2">
          Have questions? Reach out to us at{" "}
          <a
            href="mailto:support@calendo.com"
            className="text-[#00b5b8] font-medium underline"
          >
            support@techifive.com
          </a>
          .
        </p>

        <div className="text-center mt-6">
          <a
            href="/"
            className="inline-block px-6 py-2 text-white bg-[#00b5b8] rounded-lg hover:bg-[#369A9A] transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
