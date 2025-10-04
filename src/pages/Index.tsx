import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Shield, Activity, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import heroImage from "@/assets/hero-brain.jpg";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning models analyze speech patterns, cognitive performance, and behavioral indicators",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is encrypted and secure. We never share your personal health information",
    },
    {
      icon: Activity,
      title: "Comprehensive Assessment",
      description: "Multi-faceted evaluation combining voice, memory, and behavioral analysis for accurate results",
    },
    {
      icon: Clock,
      title: "Quick & Easy",
      description: "Complete the entire assessment in just 15 minutes from the comfort of your home",
    },
  ];

  const benefits = [
    "Early detection can help manage symptoms more effectively",
    "Track cognitive health changes over time",
    "Easy-to-understand risk assessment",
    "Personalized recommendations for next steps",
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
                Early Detection for
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  Cognitive Health
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Take control of your cognitive health with our AI-powered early-stage dementia detection tool. 
                Simple, accessible, and designed with care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/assessment">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto">
                    Start Assessment
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="animate-slide-up">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={heroImage}
                  alt="Cognitive health illustration"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive assessment uses cutting-edge AI to evaluate multiple cognitive health indicators
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="p-6 bg-gradient-card border-0 shadow-md hover:shadow-lg transition-smooth animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-card-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 bg-gradient-card border-0 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-card-foreground">
                    Why Early Detection Matters
                  </h2>
                  <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-primary-light rounded-2xl p-8 text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-primary mb-6 shadow-glow">
                    <Brain className="w-12 h-12 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">15 Minutes</h3>
                  <p className="text-muted-foreground mb-6">
                    That's all it takes to complete your comprehensive cognitive health assessment
                  </p>
                  <Link to="/assessment">
                    <Button variant="hero" size="lg" className="w-full">
                      Get Started Now
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              Take the First Step Today
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of people taking control of their cognitive health with our easy-to-use assessment tool
            </p>
            <Link to="/assessment">
              <Button variant="hero" size="lg">
                Begin Your Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground">
            This tool is for informational purposes only and does not constitute medical advice. 
            Always consult with a qualified healthcare professional.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
