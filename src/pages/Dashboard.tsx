
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import { Shield, ShieldCheck, ShieldX, LogOut, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      } else {
        setUser(session.user);
        fetchDetectionHistory(session.user.id);
      }
    };

    checkSession();
  }, [navigate]);

  const fetchDetectionHistory = async (userId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('detection_history')
        .select('*')
        .eq('user_id', userId)
        .order('detected_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during logout",
        variant: "destructive",
      });
    }
  };

  const getSafetyIcon = (safetyScore: number) => {
    if (safetyScore >= 80) {
      return <ShieldCheck className="h-5 w-5 text-cyber-success" />;
    } else if (safetyScore >= 50) {
      return <Shield className="h-5 w-5 text-cyber-warning" />;
    } else {
      return <ShieldX className="h-5 w-5 text-cyber-danger" />;
    }
  };

  return (
    <div className="min-h-screen bg-cyber-dark text-cyber-text">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">User Dashboard</h1>
            <p className="text-cyber-muted">{user?.email}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="border-cyber-accent text-cyber-accent hover:bg-cyber-accent/10"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <div className="bg-cyber-light p-6 rounded-lg border border-cyber-accent/30 shadow-lg">
          <div className="flex items-center mb-4">
            <History className="h-5 w-5 text-cyber-accent mr-2" />
            <h2 className="text-xl font-bold">Detection History</h2>
          </div>

          {loading ? (
            <div className="py-8 text-center text-cyber-muted">
              <div className="inline-block w-8 h-8 border-2 border-cyber-accent border-t-transparent rounded-full animate-spin mb-2"></div>
              <p>Loading history...</p>
            </div>
          ) : history.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cyber-accent/20">
                    <th className="text-left py-3 px-4 text-cyber-muted font-medium">URL</th>
                    <th className="text-left py-3 px-4 text-cyber-muted font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-cyber-muted font-medium">Safety Score</th>
                    <th className="text-left py-3 px-4 text-cyber-muted font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item: any) => (
                    <tr key={item.id} className="border-b border-cyber-accent/10 hover:bg-cyber-accent/5">
                      <td className="py-3 px-4 font-mono text-sm truncate max-w-[200px]">{item.url}</td>
                      <td className="py-3 px-4 text-cyber-muted">
                        {new Date(item.detected_at).toLocaleString()}
                      </td>
                      <td className="py-3 px-4">{item.result?.safetyScore}%</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {getSafetyIcon(item.result?.safetyScore)}
                          <span className="ml-2">
                            {item.result?.safetyScore >= 80 
                              ? "Safe" 
                              : item.result?.safetyScore >= 50 
                                ? "Suspicious" 
                                : "Dangerous"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-8 text-center text-cyber-muted">
              <p>No detection history found. Start analyzing URLs to see your history.</p>
              <Button 
                onClick={() => navigate('/')} 
                className="mt-4 bg-cyber-accent hover:bg-cyber-accent/80 text-black"
              >
                Analyze URLs
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
