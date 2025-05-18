
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Shield } from "lucide-react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "You have been logged in successfully",
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-md mx-auto pt-12">
      <div className="bg-cyber-light p-8 rounded-lg border border-cyber-accent/30 shadow-lg">
        <div className="flex justify-center mb-6">
          <Shield className="h-12 w-12 text-cyber-accent" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-6 text-cyber-text">Login to PhishGuard Pro</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-cyber-text mb-1">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-cyber-darker border-cyber-accent/20 text-cyber-text"
              autoComplete="email"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-cyber-text mb-1">Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-cyber-darker border-cyber-accent/20 text-cyber-text"
              autoComplete="current-password"
              required
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-cyber-accent hover:bg-cyber-accent/80 text-black font-bold"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-cyber-muted text-sm">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-cyber-accent hover:underline"
              onClick={(e) => {
                e.preventDefault();
                navigate("/register");
              }}
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
