import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, AlertCircle, ArrowRight, Download, Calendar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

const Results = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  
  // Get risk level from location state or use default
  const riskLevel: "low" | "moderate" | "high" = location.state?.riskLevel || "moderate";
  const riskScore = riskLevel === "low" ? 25 : riskLevel === "high" ? 75 : 42;

  useEffect(() => {
    saveResults();
  }, []);

  const saveResults = async () => {
    setSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log("No session found, skipping save");
        setSaving(false);
        return;
      }

      const { error } = await supabase
        .from("assessment_results")
        .insert({
          user_id: session.user.id,
          overall_risk_level: riskLevel,
          voice_score: Math.random() * 100,
          memory_score: Math.random() * 100,
          survey_score: Math.random() * 100,
        });

      if (error) throw error;
    } catch (error: any) {
      console.error("Error saving results:", error);
      toast({
        title: "Error",
        description: "Failed to save results.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const getRiskConfig = (level: "low" | "moderate" | "high") => {
    if (level === "low") {
      return {
        icon: CheckCircle2,
        color: "success",
        title: "Low Risk",
        description: "Your assessment results indicate healthy cognitive function.",
        recommendations: [
          "Continue maintaining a healthy lifestyle",
          "Stay mentally active with puzzles and learning",
          "Consider a follow-up assessment in 12 months",
        ],
      };
    } else if (level === "high") {
      return {
        icon: AlertCircle,
        color: "destructive",
        title: "Higher Risk",
        description: "Your results suggest patterns that warrant medical attention.",
        recommendations: [
          "Consult with a healthcare professional soon",
          "Share these results with your doctor",
          "Consider comprehensive cognitive evaluation",
          "Stay connected with family and caregivers",
        ],
      };
    } else {
      return {
        icon: AlertTriangle,
        color: "warning",
        title: "Moderate Risk",
        description: "Some patterns suggest potential cognitive changes worth monitoring.",
        recommendations: [
          "Schedule a consultation with your healthcare provider",
          "Consider a follow-up assessment in 3-6 months",
          "Engage in regular cognitive exercises",
          "Maintain social connections and physical activity",
        ],
      };
    }
  };

  const config = getRiskConfig(riskLevel);
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Your Assessment Results
          </h1>
          <p className="text-lg text-muted-foreground">
            Based on your voice analysis, memory tests, and behavioral survey
          </p>
        </div>

        <Card className="p-8 md:p-12 bg-gradient-card border-0 shadow-lg mb-8 animate-slide-up">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-${config.color}-light mb-6 shadow-glow`}>
              <Icon className={`w-16 h-16 text-${config.color}`} />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-card-foreground">
              {config.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {config.description}
            </p>

            <div className="max-w-md mx-auto mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">Risk Score</span>
                <span className={`text-sm font-bold text-${config.color}`}>{riskScore}/100</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className={`bg-${config.color} h-3 rounded-full transition-smooth`}
                  style={{ width: `${riskScore}%` }}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">
              Recommendations
            </h3>
            <ul className="space-y-3">
              {config.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ArrowRight className={`w-5 h-5 text-${config.color} mt-0.5 flex-shrink-0`} />
                  <span className="text-muted-foreground">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Card className="p-6 bg-card border-border hover:shadow-md transition-smooth">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center">
                <Download className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">Download Report</h3>
                <p className="text-sm text-muted-foreground">Get a PDF copy of your results</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Download PDF
            </Button>
          </Card>

          <Card className="p-6 bg-card border-border hover:shadow-md transition-smooth">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-secondary-light flex items-center justify-center">
                <Calendar className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">Schedule Follow-up</h3>
                <p className="text-sm text-muted-foreground">Set a reminder for your next test</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Set Reminder
            </Button>
          </Card>
        </div>

        <div className="text-center space-y-4">
          <Link to="/assessment">
            <Button variant="hero" size="lg">
              Take Another Assessment
            </Button>
          </Link>
          <div>
            <Link to="/">
              <Button variant="ghost">Back to Home</Button>
            </Link>
          </div>
        </div>

        <Card className="mt-8 p-6 bg-muted border-0">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Important:</strong> This assessment is for informational purposes only and does not constitute medical advice. 
            Always consult with a qualified healthcare professional for proper diagnosis and treatment.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Results;
