import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle, Shield, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const ScamAnalyzer = () => {
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAnalysis = async () => {
    if (!input.trim()) {
      toast({
        title: "Please enter a message or link to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    // Analysis simulation with pattern matching
    setTimeout(() => {
      setIsAnalyzing(false);
      const result = analyzeInput(input);
      setLastAnalysis(result);
      toast({
        title: "Analysis Complete",
        description: result,
        className: "bg-safety text-white",
      });
    }, 1000);
  };

  const analyzeInput = (text: string): string => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes("free") && lowerText.includes("win")) {
      return "⚠️ High Risk: Potential prize scam detected. Be cautious of 'free' prizes.";
    } else if (lowerText.includes("urgent") || lowerText.includes("immediate")) {
      return "⚠️ Medium Risk: Urgency tactics detected. Take time to verify.";
    } else if (lowerText.includes("password") || lowerText.includes("login")) {
      return "⚠️ Warning: Potential phishing attempt. Never share login credentials.";
    }
    return "✅ No immediate threats detected. Stay vigilant!";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAnalysis();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-8 animate-fadeIn">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-2 bg-safety/10 rounded-full hover:bg-safety/20 transition-colors cursor-pointer">
          <Shield className="w-8 h-8 text-safety animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">ScamWise Helper</h1>
        <p className="text-muted-foreground">
          Your personal scam detection assistant
        </p>
      </div>

      <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow duration-300">
        <div className="flex gap-2">
          <Input
            placeholder="Enter message, link, or email to analyze..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="transition-all duration-300 focus:ring-2 focus:ring-safety"
          />
          <Button
            onClick={handleAnalysis}
            disabled={isAnalyzing}
            className={cn(
              "min-w-[120px] transition-all duration-300",
              isAnalyzing ? "bg-neutral" : "bg-safety hover:bg-safety-dark"
            )}
          >
            {isAnalyzing ? "Analyzing..." : "Analyze"}
          </Button>
        </div>

        {lastAnalysis && (
          <div className="p-4 rounded-lg bg-background/50 border border-safety/20 animate-fadeIn">
            <p className="flex items-center gap-2">
              <Info className="w-5 h-5 text-safety" />
              {lastAnalysis}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <SecurityIndicator
            icon={AlertCircle}
            title="Phishing Detection"
            description="Analyzes for suspicious links and requests"
            status="active"
          />
          <SecurityIndicator
            icon={CheckCircle}
            title="Content Analysis"
            description="Checks for manipulative language"
            status="active"
          />
          <SecurityIndicator
            icon={Shield}
            title="Risk Assessment"
            description="Evaluates overall threat level"
            status="active"
          />
        </div>
      </Card>

      <div className="text-center space-y-2">
        <div className="text-sm text-muted-foreground">
          Always verify suspicious content with official sources
        </div>
        <div className="text-xs text-muted-foreground">
          © 2024 Hrishikesh Gade | ScamWise Helper
        </div>
      </div>
    </div>
  );
};

const SecurityIndicator = ({
  icon: Icon,
  title,
  description,
  status,
}: {
  icon: any;
  title: string;
  description: string;
  status: "active" | "inactive";
}) => {
  return (
    <div className="p-4 rounded-lg bg-background border transition-all duration-300 hover:border-safety hover:shadow-md cursor-pointer group">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-safety group-hover:scale-110 transition-transform" />
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ScamAnalyzer;
