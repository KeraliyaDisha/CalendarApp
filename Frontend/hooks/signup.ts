/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, FormEvent } from "react";
import { useMutation, ApolloError } from "@apollo/client";
import { useRouter } from "next/navigation";
import { SIGNUP } from "@/graphql/mutations";

export function useSignup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [signup, { loading }] = useMutation(SIGNUP);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const { firstName, lastName, email, password } = formData;

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    try {
      const { data } = await signup({
        variables: { firstName, lastName, email, password },
      });

      if (data?.signup?.token) {
        router.push("/auth/signin");
      } else {
        setErrorMessage("Signup failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Signup failed:", error);

      if (error instanceof ApolloError) {
        const userExistsError = error.graphQLErrors.find((err) =>
          err.message.includes("already exists")
        );

        if (userExistsError) {
          setErrorMessage(
            `The email is already exist. Please try another one.`
          );
        } else {
          setErrorMessage("Signup failed. Please try again.");
        }
      } else {
        setErrorMessage("Signup failed. Please try again.");
      }
    }
  };

  return { formData, handleChange, handleSubmit, loading, errorMessage };
}
