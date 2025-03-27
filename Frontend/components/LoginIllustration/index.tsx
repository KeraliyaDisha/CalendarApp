import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const LoginIllustration: React.FC = () => {
  return (
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
  );
};

export default LoginIllustration;
