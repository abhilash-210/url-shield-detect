
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Shield, History, LogIn, User } from "lucide-react";

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="flex flex-wrap items-center gap-1 md:gap-4 justify-end">
      <Button
        variant="ghost"
        className={`text-cyber-muted hover:text-cyber-text ${
          location.pathname === "/" ? "text-cyber-accent" : ""
        }`}
        onClick={() => navigate("/")}
      >
        <Shield className="mr-1 h-4 w-4" />
        <span className="hidden md:inline">Analyzer</span>
      </Button>
      
      <Button
        variant="ghost"
        className={`text-cyber-muted hover:text-cyber-text ${
          location.pathname === "/dashboard" ? "text-cyber-accent" : ""
        }`}
        onClick={() => navigate("/dashboard")}
      >
        <History className="mr-1 h-4 w-4" />
        <span className="hidden md:inline">History</span>
      </Button>
      
      <Button
        variant="ghost"
        className={`text-cyber-muted hover:text-cyber-text ${
          location.pathname === "/login" ? "text-cyber-accent" : ""
        }`}
        onClick={() => navigate("/login")}
      >
        <LogIn className="mr-1 h-4 w-4" />
        <span className="hidden md:inline">Login</span>
      </Button>
      
      <Button
        variant="ghost"
        className={`text-cyber-muted hover:text-cyber-text ${
          location.pathname === "/register" ? "text-cyber-accent" : ""
        }`}
        onClick={() => navigate("/register")}
      >
        <User className="mr-1 h-4 w-4" />
        <span className="hidden md:inline">Register</span>
      </Button>
    </nav>
  );
};

export default Navigation;
