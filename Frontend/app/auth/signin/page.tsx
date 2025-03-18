"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {signin } from "../../../types"
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { SIGNIN } from "../../../graphql/mutations";
import Cookies from "js-cookie";
import Link from "next/link";
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

const Login: React.FC = () => {
  const [signin, { loading, error }] = useMutation(SIGNIN);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signin>();

  const onSubmit = async (formData: signin) => {
    try {
      const response = await signin({
        variables: { email: formData.email, password: formData.password },
      });

      if (response.data) {
        Cookies.set("token", response.data.signin.token, {
          secure: true,
          sameSite: "strict",
        });
        setSuccessMessage("You are successfully logged in!");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setSuccessMessage(null);
    }
  };

  useEffect(() => {
    if (successMessage) {
      {
        router.push("/home");
      }
    }
  }, [successMessage, router]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Side with Animation */}
      <motion.div
        className="w-1/2 flex justify-center items-center bg-gray-600"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/image_login.svg"
          alt="Login Illustration"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Right Side Form with Additional Animations */}
      <motion.div
        className="w-1/2 flex justify-center items-center overflow-hidden"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Heading */}
          <motion.h2
            className="flex items-center justify-center text-2xl font-bold text-gray-600 mb-6"
            variants={itemVariants}
          >
            <Calendar className="w-6 h-6 mr-2" />
            Welcome Back!
          </motion.h2>

          {/* Loading / Error / Success Messages */}
          {loading && (
            <motion.p
              className="text-gray-500 text-center"
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

          {/* Login Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 mt-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <input
                type="email"
                placeholder="Email"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition-colors ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300 hover:border-gray-400"
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

            <motion.div className="relative" variants={itemVariants}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition-colors ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300 hover:border-gray-400"
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
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
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
              className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition transform hover:scale-105"
              disabled={loading}
              variants={itemVariants}
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </motion.form>

          <motion.p
            className="text-center text-gray-600 mt-6"
            variants={itemVariants}
          >
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-gray-900 font-medium hover:text-gray-600">
              Sign up
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
