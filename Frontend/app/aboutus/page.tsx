"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const AboutUs: React.FC = () => {
  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gray-100 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
        {/* Header */}
        <motion.h2
          className="text-4xl font-bold text-center text-gray-800 mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          About <span className="text-gray-600">Calendo</span>
        </motion.h2>

        {/* Project Description */}
        <motion.p
          className="text-gray-600 text-center mb-6 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gray-800 font-semibold">Calendo</span> is a
          modern calendar and scheduling platform designed to streamline event
          management and improve productivity. Whether you&apos;re an individual or a
          business, Calendo makes organizing your time effortless with powerful,
          real-time scheduling tools.
        </motion.p>

        {/* Features Section */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="text-2xl font-semibold text-gray-700 text-center mb-4">
            Why Choose Calendo?
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2 px-4">
            <li>
              📅 <strong>Smart Scheduling</strong> – Easily create, update, and
              manage events.
            </li>
            <li>🔄 <strong>Real-Time Updates</strong> – Instant synchronization across all devices.</li>
            <li>🤝 <strong>Collaboration</strong> – Share schedules and coordinate with teams.</li>
            <li>📊 <strong>Insights & Analytics</strong> – Get reports on time management.</li>
            <li>🖥️ <strong>Multi-Platform</strong> – Accessible on web and mobile.</li>
          </ul>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="text-2xl font-semibold text-gray-700">Get in Touch</h3>
          <p className="text-gray-600 mt-2">
            Have questions or feedback? Contact us at{" "}
            <a
              href="mailto:support@calendo.com"
              className="text-[#00b5b8] font-medium underline underline-offset-2 hover:text-gray-800 transition"
            >
              support@calendo.com
            </a>
            .
          </p>
        </motion.div>

        {/* Back to Home Button */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Link
            href="/"
            className="inline-block px-6 py-3 text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-all transform hover:scale-105"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
