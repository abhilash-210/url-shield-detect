
import React from "react";
import { Shield } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 mb-8">
      <div className="container mx-auto flex justify-center">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-cyber-accent animate-pulse-glow" />
          <div>
            <h1 className="text-2xl font-bold text-cyber-text">PhishGuard</h1>
            <p className="text-sm text-cyber-muted">Advanced URL Analysis & Protection</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
