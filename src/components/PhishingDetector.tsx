
import React, { useState } from "react";
import UrlInput from "./UrlInput";
import ResultsDisplay from "./ResultsDisplay";
import PhishingStats from "./PhishingStats";
import { analyzeUrl } from "@/utils/urlAnalysis";
import { useToast } from "@/hooks/use-toast";

const PhishingDetector: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const handleAnalyzeUrl = async (url: string) => {
    setIsAnalyzing(true);
    
    try {
      // Simulating API call with a delay
      const analysisResult = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(analyzeUrl(url));
        }, 2500); // Add 2.5s delay to simulate analysis
      });
      
      setResult(analysisResult as any);
      
      // Show toast notification based on result
      const safetyScore = (analysisResult as any).safetyScore;
      if (safetyScore >= 80) {
        toast({
          title: "Analysis Complete",
          description: "This URL appears to be safe",
          variant: "default",
        });
      } else if (safetyScore >= 50) {
        toast({
          title: "Analysis Complete",
          description: "This URL may be suspicious - proceed with caution",
          // Changed from "warning" to "default" as warning is not a valid variant
          variant: "default", 
        });
      } else {
        toast({
          title: "Warning: Potentially Dangerous URL",
          description: "This URL has been flagged as potentially dangerous",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error analyzing URL:", error);
      toast({
        title: "Analysis Error",
        description: "An error occurred during URL analysis",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto">
      <UrlInput onAnalyze={handleAnalyzeUrl} isAnalyzing={isAnalyzing} />
      
      {isAnalyzing && (
        <div className="mt-8 w-full max-w-xl mx-auto">
          <div className="bg-cyber-light p-6 rounded-lg border border-cyber-accent/30 shadow-lg flex justify-center">
            <div className="text-center">
              <div className="inline-block w-16 h-16 relative mb-4">
                <div className="w-full h-full rounded-full border-4 border-cyber-accent/20"></div>
                <div className="absolute top-0 w-16 h-16 rounded-full border-t-4 border-cyber-accent animate-spin"></div>
              </div>
              <h3 className="text-lg font-bold text-cyber-text">Analyzing URL</h3>
              <p className="text-sm text-cyber-muted max-w-md mt-2">
                Scanning for patterns, checking against databases, and analyzing for threats...
              </p>
            </div>
          </div>
        </div>
      )}
      
      {!isAnalyzing && result && <ResultsDisplay result={result} />}
      
      <PhishingStats />
      
      <div className="mt-8 text-center text-sm text-cyber-muted pb-10">
        <p>
          PhishGuard uses advanced ML algorithms to detect phishing and malicious URLs.
          <br />
          For connecting to databases or implementing backend functionality, please contact support.
        </p>
      </div>
    </div>
  );
};

export default PhishingDetector;
