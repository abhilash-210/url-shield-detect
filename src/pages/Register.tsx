
import React from "react";
import Header from "@/components/Header";
import RegisterForm from "@/components/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen bg-cyber-dark text-cyber-text">
      <Header />
      <main className="container mx-auto px-4">
        <RegisterForm />
      </main>
    </div>
  );
};

export default Register;
