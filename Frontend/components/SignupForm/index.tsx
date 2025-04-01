"use client";

import React, { useState } from "react";
import { useSignup } from "@/hooks/signup";
import { EyeIcon, EyeOffIcon, Calendar } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const SignupForm: React.FC = () => {
  const { formData, handleChange, handleSubmit, loading, errorMessage } = useSignup();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <motion.div
      className="w-1/2 flex justify-center items-center overflow-hidden bg-gradient-to-br from-white to-[#2D4D59]/10"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg mx-4">
        <h2 className="flex items-center justify-center text-2xl font-bold text-gray-600 mb-6">
          <Calendar className="w-6 h-6 mr-2" />
          Welcome to Calendo!
        </h2>

        {/* Display Error Message */}
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-5 mt-5">
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-800"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition transform hover:scale-105"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-gray-900 font-medium hover:text-gray-600">
            Log in
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SignupForm;
