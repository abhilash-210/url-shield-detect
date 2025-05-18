
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Shield, ShieldCheck, ShieldX, History } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  // Sample history data since we're removing authentication
  const [history] = useState([
    {
      id: 1,
      url: "https://example.com",
      detected_at: new Date().toISOString(),
      result: { safetyScore: 95 }
    },
    {
      id: 2,
      url: "https://suspicious-example.net",
      detected_at: new Date(Date.now() - 86400000).toISOString(),
      result: { safetyScore: 65 }
    },
    {
      id: 3,
      url: "https://malicious-example.org",
      detected_at: new Date(Date.now() - 172800000).toISOString(),
      result: { safetyScore: 25 }
    }
  ]);
  const navigate = useNavigate();

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
            <h1 className="text-2xl font-bold mb-1">Sample URL Analysis History</h1>
            <p className="text-cyber-muted">Recent URL scanning results</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="border-cyber-accent text-cyber-accent hover:bg-cyber-accent/10"
            >
              <Shield className="mr-2 h-4 w-4" />
              Back to Analyzer
            </Button>
          </div>
        </div>

        <div className="bg-cyber-light p-6 rounded-lg border border-cyber-accent/30 shadow-lg">
          <div className="flex items-center mb-4">
            <History className="h-5 w-5 text-cyber-accent mr-2" />
            <h2 className="text-xl font-bold">Example Detection History</h2>
          </div>

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
                {history.map((item) => (
                  <tr key={item.id} className="border-b border-cyber-accent/10 hover:bg-cyber-accent/5">
                    <td className="py-3 px-4 font-mono text-sm truncate max-w-[200px]">{item.url}</td>
                    <td className="py-3 px-4 text-cyber-muted">
                      {new Date(item.detected_at).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">{item.result.safetyScore}%</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {getSafetyIcon(item.result.safetyScore)}
                        <span className="ml-2">
                          {item.result.safetyScore >= 80 
                            ? "Safe" 
                            : item.result.safetyScore >= 50 
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
          
          <div className="mt-8 text-center text-sm text-cyber-muted">
            <p>Login or register to save your URL analysis history</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
