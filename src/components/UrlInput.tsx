
import React, { useState } from "react";
import { Link2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UrlInputProps {
  onAnalyze: (url: string) => void;
  isAnalyzing: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({ onAnalyze, isAnalyzing }) => {
  const [url, setUrl] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");

  const validateUrl = (input: string) => {
    if (!input.trim()) {
      setError("URL is required");
      setIsValid(false);
      return false;
    }

    try {
      // Basic URL validation using URL constructor
      new URL(input);
      setIsValid(true);
      setError("");
      return true;
    } catch (e) {
      setError("Invalid URL format");
      setIsValid(false);
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateUrl(url)) {
      onAnalyze(url);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-cyber-light p-6 rounded-lg border border-cyber-accent/30 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="url" className="text-cyber-text font-medium flex items-center gap-2">
              <Link2 className="h-4 w-4 text-cyber-accent" />
              <span>Enter URL for Analysis</span>
            </label>
            <div className="relative">
              <Input
                id="url"
                type="text"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (error) validateUrl(e.target.value);
                }}
                className={`bg-cyber-darker border-cyber-accent/20 text-cyber-text font-mono placeholder:text-cyber-muted/70 focus:border-cyber-accent focus:ring-cyber-accent/30 ${
                  !isValid ? "border-cyber-danger" : ""
                }`}
                disabled={isAnalyzing}
              />
              {error && <p className="text-cyber-danger text-sm mt-1">{error}</p>}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-cyber-accent hover:bg-cyber-accent/80 text-black font-medium"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <div className="flex items-center gap-2">
                <span className="animate-pulse">Analyzing...</span>
                <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-cyber-dark animate-spin"></div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                <span>Analyze URL</span>
              </div>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UrlInput;
