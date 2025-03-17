"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { SIGNUP } from "@/graphql/mutations";
import { signup } from "@/types";
import Cookies from "js-cookie";
import { EyeIcon, EyeOffIcon, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Signup: React.FC = () => {
  const [signup, { loading, error }] = useMutation(SIGNUP);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signup>();

  const onSubmit = async (formData: signup) => {
    try {
      const response = await signup({ variables: formData });
      if (response.data) {
        Cookies.set("token", response.data.signup.token, {
          secure: true,
          sameSite: "strict",
        });
        setSuccessMessage("Account created successfully");
      }
    } catch (err) {
      console.error("Signup Error:", err);
    }
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        router.push("/protected/home");
      }, 0);
    }
  }, [successMessage, router]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Side with matching color (#2D4D59) + Motion Animation */}
      <motion.div
        className="w-1/2 flex justify-center items-center bg-teal-600"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/image_signup.svg"
          alt="Signup Illustration"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Right Side with a subtle gradient, matching the left side photo's color scheme */}
      <motion.div
        className="w-1/2 flex justify-center items-center overflow-hidden bg-gradient-to-br from-white to-[#2D4D59]/10"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-lg mx-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Title */}
          <motion.h2
            className="flex items-center justify-center text-2xl font-bold text-[#009689] mb-6"
            variants={itemVariants}
          >
            <Calendar className="w-6 h-6 mr-2 text-teal-600" />
            Welcome to Calendo!
          </motion.h2>

          {/* Loading / Error / Success Messages */}
          {loading && (
            <motion.p
              className="text-[#009689] text-center"
              variants={itemVariants}
            >
              Loading...
            </motion.p>
          )}
          {error && (
            <motion.p
              className="text-red-500 text-center"
              variants={itemVariants}
            >
              {error.message}
            </motion.p>
          )}
          {successMessage && (
            <motion.p
              className="text-green-500 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {successMessage}
            </motion.p>
          )}

          {/* Signup Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 mt-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* First Name */}
            <motion.div variants={itemVariants}>
              <input
                type="text"
                placeholder="First Name"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition-colors ${
                  errors.firstName
                    ? "border-red-500"
                    : "border-gray-300 hover:border-[#2D4D59]"
                }`}
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </motion.div>

            {/* Last Name */}
            <motion.div variants={itemVariants}>
              <input
                type="text"
                placeholder="Last Name"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition-colors ${
                  errors.lastName
                    ? "border-red-500"
                    : "border-gray-300 hover:border-[#2D4D59]"
                }`}
                {...register("lastName", {
                  required: "Last name is required",
                })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants}>
              <input
                type="email"
                placeholder="Email"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition-colors ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300 hover:border-[#2D4D59]"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div className="relative" variants={itemVariants}>
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition-colors ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300 hover:border-[#2D4D59]"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-800"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <EyeOffIcon size={20} />
                ) : (
                  <EyeIcon size={20} />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </motion.div>

            <motion.button
              type="submit"
              className="w-full bg-[#009689] text-white py-2 rounded-lg hover:bg-[#009689]/90 transition transform hover:scale-105"
              disabled={loading}
              variants={itemVariants}
            >
              {loading ? "Signing Up..." : "Create Account"}
            </motion.button>
          </motion.form>

          <motion.p
            className="text-center text-[#009689] mt-6"
            variants={itemVariants}
          >
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-teal-800 font-medium underline underline-offset-2"
            >
              Log in
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;
