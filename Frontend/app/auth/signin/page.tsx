"use client";
import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { SIGNIN } from "../../../graphql/mutations";
import LoginIllustration from "@/components/LoginIllustration";
import LoginForm from "@/components/LoginForm";

const LoginPage: React.FC = () => {
  const [signin, { loading, error }] = useMutation(SIGNIN);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (successMessage) {
      router.push("/home");
    }
  }, [successMessage, router]);

  const handleLogin = async (formData: { email: string; password: string }) => {
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

  return (
    <div className="flex h-screen bg-gray-50">
      <LoginIllustration />
      <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
    </div>
  );
};

export default LoginPage;
