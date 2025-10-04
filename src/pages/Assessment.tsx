import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Mic, Gamepad2, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";

const Assessment = () => {
  const assessmentSteps = [
    {
      icon: Mic,
      title: "Voice Recording",
      description: "Complete simple speech tasks to analyze speech patterns and pauses",
      duration: "5 min",
      path: "/assessment/voice",
      color: "primary",
    },
    {
      icon: Gamepad2,
      title: "Memory Games",
      description: "Quick cognitive tests including word recall and reaction time exercises",
      duration: "7 min",
      path: "/assessment/memory",
      color: "secondary",
    },
    {
      icon: ClipboardList,
      title: "Behavioral Survey",
      description: "Answer questions about daily activities and behavioral patterns",
      duration: "3 min",
      path: "/assessment/survey",
      color: "accent",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-6 shadow-glow">
            <Brain className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Cognitive Health Assessment
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete these three simple steps to receive your personalized cognitive health report.
            The entire assessment takes approximately 15 minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {assessmentSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={index}
                className="p-6 bg-gradient-card border-0 shadow-md hover:shadow-lg transition-smooth animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col h-full">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-${step.color}-light mb-4`}>
                    <Icon className={`w-7 h-7 text-${step.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-card-foreground">{step.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{step.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground">{step.duration}</span>
                    <Link to={step.path}>
                      <Button size="sm">Start</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-8 bg-primary-light border-primary/20 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-grow">
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">Ready to Begin?</h3>
              <p className="text-muted-foreground">
                Start your assessment journey and take the first step towards understanding your cognitive health better.
              </p>
            </div>
            <Link to="/assessment/voice">
              <Button variant="hero" size="lg">
                Start Assessment
              </Button>
            </Link>
          </div>
        </Card>

        <div className="text-center mt-8">
          <Link to="/">
            <Button variant="ghost">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
