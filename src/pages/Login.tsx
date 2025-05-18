
import React from "react";
import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen bg-cyber-dark text-cyber-text">
      <Header />
      <main className="container mx-auto px-4">
        <LoginForm />
      </main>
    </div>
  );
};

export default Login;
