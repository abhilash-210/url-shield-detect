
import React from "react";
import { AnalysisResult } from "@/utils/urlAnalysis";
import { Shield, ShieldCheck, ShieldX, AlertTriangle, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ResultsDisplayProps {
  result: AnalysisResult | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  if (!result) return null;

  const getStatusIcon = () => {
    if (result.safetyScore >= 80) {
      return <ShieldCheck className="h-12 w-12 text-cyber-success" />;
    } else if (result.safetyScore >= 50) {
      return <Shield className="h-12 w-12 text-cyber-warning" />;
    } else {
      return <ShieldX className="h-12 w-12 text-cyber-danger" />;
    }
  };

  const getStatusText = () => {
    if (result.safetyScore >= 80) {
      return "Safe";
    } else if (result.safetyScore >= 50) {
      return "Potentially Suspicious";
    } else {
      return "Dangerous";
    }
  };

  const getStatusColor = () => {
    if (result.safetyScore >= 80) {
      return "text-cyber-success";
    } else if (result.safetyScore >= 50) {
      return "text-cyber-warning";
    } else {
      return "text-cyber-danger";
    }
  };

  const getProgressColor = () => {
    if (result.safetyScore >= 80) {
      return "bg-cyber-success";
    } else if (result.safetyScore >= 50) {
      return "bg-cyber-warning";
    } else {
      return "bg-cyber-danger";
    }
  };

  return (
    <div className="mt-8 w-full max-w-2xl mx-auto">
      <div className="bg-cyber-light p-6 rounded-lg border border-cyber-accent/30 shadow-lg">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-shrink-0 flex flex-col items-center">
            {getStatusIcon()}
            <h3 className={`font-bold mt-2 ${getStatusColor()}`}>{getStatusText()}</h3>
          </div>
          
          <div className="flex-grow w-full">
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-1 text-cyber-text">Analysis Results</h2>
              <p className="text-sm text-cyber-muted break-all font-mono">{result.url}</p>
            </div>
            
            <div className="space-y-4 w-full">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-cyber-text">Safety Score</span>
                  <span className={`text-sm font-bold ${getStatusColor()}`}>{result.safetyScore}%</span>
                </div>
                {/* Fixed: Removed indicatorClassName and applied the color directly to className prop */}
                <Progress 
                  value={result.safetyScore} 
                  className={`h-2 bg-cyber-darker ${getProgressColor()}`} 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.threatFactors.map((factor, index) => (
                  <div key={index} className="flex items-start gap-2">
                    {factor.level === "high" ? (
                      <AlertTriangle className="h-4 w-4 mt-0.5 text-cyber-danger" />
                    ) : factor.level === "medium" ? (
                      <Info className="h-4 w-4 mt-0.5 text-cyber-warning" />
                    ) : (
                      <Info className="h-4 w-4 mt-0.5 text-cyber-accent" />
                    )}
                    <div>
                      <p className="text-sm text-cyber-text">{factor.name}</p>
                      <p className="text-xs text-cyber-muted">{factor.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
