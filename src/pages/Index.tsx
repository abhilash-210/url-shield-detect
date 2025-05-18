
import React from "react";
import Header from "@/components/Header";
import PhishingDetector from "@/components/PhishingDetector";

const Index = () => {
  return (
    <div className="min-h-screen bg-cyber-dark text-cyber-text">
      <Header />
      <main className="container mx-auto px-4">
        <PhishingDetector />
      </main>
    </div>
  );
};

export default Index;
