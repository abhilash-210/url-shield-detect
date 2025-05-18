
import React from "react";
import { Shield } from "lucide-react";
import Navigation from "./Navigation";

const AppHeader: React.FC = () => {
  return (
    <header className="bg-cyber-darker border-b border-cyber-accent/20 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Shield className="text-cyber-accent h-7 w-7 mr-2" />
          <h1 className="text-xl font-bold text-cyber-text">PhishGuard Pro</h1>
        </div>
        <Navigation />
      </div>
    </header>
  );
};

export default AppHeader;
