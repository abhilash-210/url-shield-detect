
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Database, AlertTriangle } from "lucide-react";

const PhishingStats: React.FC = () => {
  return (
    <div className="w-full mt-10 mb-6">
      <h2 className="text-xl font-bold mb-4 text-center text-cyber-text">Phishing Detection Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-cyber-light border-cyber-accent/20 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyber-muted flex items-center gap-2">
              <Shield className="h-4 w-4 text-cyber-accent" />
              URLs Analyzed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-cyber-text">248,543</p>
          </CardContent>
          <CardFooter className="pt-0">
            <p className="text-xs text-cyber-accent">Updated daily</p>
          </CardFooter>
        </Card>
        
        <Card className="bg-cyber-light border-cyber-accent/20 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyber-muted flex items-center gap-2">
              <Database className="h-4 w-4 text-cyber-accent" />
              Database Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-cyber-text">1.2M</p>
          </CardContent>
          <CardFooter className="pt-0">
            <p className="text-xs text-cyber-accent">Known threats</p>
          </CardFooter>
        </Card>
        
        <Card className="bg-cyber-light border-cyber-accent/20 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyber-muted flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-cyber-accent" />
              Threats Detected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-cyber-text">53,127</p>
          </CardContent>
          <CardFooter className="pt-0">
            <p className="text-xs text-cyber-accent">Last 30 days</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PhishingStats;
