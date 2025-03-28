"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { SIGNUP } from "@/graphql/mutations";
import { signup } from "@/types";
import { EyeIcon, EyeOffIcon, Calendar } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const SignupForm: React.FC = () => {
  const [signupMutation, { loading, error }] = useMutation(SIGNUP);
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
      const response = await signupMutation({ variables: formData });
      if (response.data) {
        Cookies.set("token", response.data.signup.token, {
          secure: true,
          sameSite: "strict",
        });
        setSuccessMessage("Account created successfully");
        router.push("/home");
      }
    } catch (err) {
      console.error("Signup Error:", err);
    }
  };

  return (
    <motion.div
      className="w-1/2 flex justify-center items-center overflow-hidden bg-gradient-to-br from-white to-[#2D4D59]/10"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg mx-4"
      >
        <h2 className="flex items-center justify-center text-2xl font-bold text-gray-600 mb-6">
          <Calendar className="w-6 h-6 mr-2" />
          Welcome to Calendo!
        </h2>

        {error && <p className="text-red-500 text-center">{error.message}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-5">
          <div>
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-2 border rounded-lg"
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-2 border rounded-lg"
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg"
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
              {passwordVisible ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
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
