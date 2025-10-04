import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";

const MemoryGame = () => {
  const [phase, setPhase] = useState<"memorize" | "recall" | "complete">("memorize");
  const [words] = useState(["Apple", "Chair", "Ocean", "Tiger", "Piano", "Garden", "Mountain", "River"]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [timer, setTimer] = useState(15);
  const navigate = useNavigate();

  useEffect(() => {
    if (phase === "memorize" && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (phase === "memorize" && timer === 0) {
      setPhase("recall");
    }
  }, [phase, timer]);

  const handleAddWord = () => {
    if (currentInput.trim()) {
      setUserAnswers([...userAnswers, currentInput.trim()]);
      setCurrentInput("");
    }
  };

  const handleComplete = () => {
    setPhase("complete");
  };

  const handleNext = () => {
    navigate("/assessment/survey");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Memory Games</h1>
            <div className="text-sm text-muted-foreground">Step 2 of 3</div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-gradient-primary h-2 rounded-full transition-smooth" style={{ width: "66%" }} />
          </div>
        </div>

        <Card className="p-8 bg-gradient-card border-0 shadow-lg mb-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-secondary-light mb-6">
              <Brain className="w-12 h-12 text-secondary" />
            </div>

            {phase === "memorize" && (
              <>
                <h2 className="text-2xl font-semibold mb-4 text-card-foreground">
                  Memorize These Words
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Study these words carefully. You'll be asked to recall them in a moment.
                </p>

                <div className="mb-8">
                  <div className="text-4xl font-bold text-primary mb-4">{timer}s</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                    {words.map((word, index) => (
                      <div
                        key={index}
                        className="p-4 bg-primary-light rounded-lg text-lg font-semibold text-primary animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {word}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {phase === "recall" && (
              <>
                <h2 className="text-2xl font-semibold mb-4 text-card-foreground">
                  Recall the Words
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Type as many words as you can remember from the list.
                </p>

                <div className="max-w-md mx-auto mb-6">
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddWord()}
                      placeholder="Enter a word..."
                      className="flex-grow px-4 py-2 rounded-lg border-2 border-input bg-background focus:border-primary focus:outline-none transition-smooth"
                    />
                    <Button onClick={handleAddWord}>Add</Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {userAnswers.map((word, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-success-light text-success rounded-full text-sm font-medium"
                      >
                        {word}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant="hero"
                    size="lg"
                    onClick={handleComplete}
                    disabled={userAnswers.length === 0}
                    className="w-full"
                  >
                    Submit Answers
                  </Button>
                </div>
              </>
            )}

            {phase === "complete" && (
              <>
                <h2 className="text-2xl font-semibold mb-4 text-card-foreground">
                  Memory Test Complete!
                </h2>
                <p className="text-lg text-muted-foreground mb-4">
                  You recalled {userAnswers.length} out of {words.length} words.
                </p>
                <p className="text-muted-foreground mb-8">
                  Great effort! Let's move on to the final step: the behavioral survey.
                </p>
                <Button variant="hero" size="lg" onClick={handleNext} className="min-w-48">
                  Continue to Survey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </>
            )}
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

export default MemoryGame;
