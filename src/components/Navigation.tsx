
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabase";
import { Shield, History, LogIn, LogOut, User } from "lucide-react";

const Navigation: React.FC = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    checkSession();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

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
      
      {user ? (
        <>
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
            className="text-cyber-muted hover:text-cyber-text"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate("/login");
            }}
          >
            <LogOut className="mr-1 h-4 w-4" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </>
      ) : (
        <>
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
        </>
      )}
    </nav>
  );
};

export default Navigation;
