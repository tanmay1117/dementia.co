import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ClipboardList, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";

const Survey = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const questions = [
    {
      question: "How often do you forget recent conversations or events?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"],
    },
    {
      question: "Do you have difficulty finding the right words during conversations?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"],
    },
    {
      question: "How often do you misplace items or forget where you put things?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"],
    },
    {
      question: "Do you experience challenges with planning or organizing tasks?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"],
    },
    {
      question: "How often do you have trouble following or maintaining a conversation?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"],
    },
  ];

  const handleAnswer = (questionIndex: number, answer: string) => {
    setAnswers({ ...answers, [questionIndex]: answer });
  };

  const handleSubmit = () => {
    // Simulate processing and navigate to results
    navigate("/results");
  };

  const isComplete = Object.keys(answers).length === questions.length;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Behavioral Survey</h1>
            <div className="text-sm text-muted-foreground">Step 3 of 3</div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-gradient-primary h-2 rounded-full transition-smooth" style={{ width: "100%" }} />
          </div>
        </div>

        <Card className="p-8 bg-gradient-card border-0 shadow-lg mb-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-accent-light mb-6">
              <ClipboardList className="w-12 h-12 text-accent" />
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-card-foreground">
              Daily Activities Assessment
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Please answer the following questions about your daily behavior and cognitive patterns.
            </p>
          </div>

          <div className="space-y-8">
            {questions.map((q, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <h3 className="text-lg font-semibold mb-4 text-card-foreground">
                  {index + 1}. {q.question}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                  {q.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(index, option)}
                      className={`p-3 rounded-lg border-2 transition-smooth text-sm font-medium ${
                        answers[index] === option
                          ? "border-primary bg-primary-light text-primary"
                          : "border-border bg-background hover:border-primary/50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <div className="mb-4 text-sm text-muted-foreground">
              {Object.keys(answers).length} of {questions.length} questions answered
            </div>
            <Button
              variant="hero"
              size="lg"
              onClick={handleSubmit}
              disabled={!isComplete}
              className="min-w-48"
            >
              Complete Assessment
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </Card>

        <div className="text-center">
          <Link to="/assessment">
            <Button variant="ghost">Back to Assessment</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Survey;
