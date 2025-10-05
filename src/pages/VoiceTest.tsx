import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, CheckCircle2, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";

const VoiceTest = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  const tasks = [
    "Please describe what you had for breakfast today.",
    "Tell us about your favorite childhood memory.",
    "Describe the last book you read or movie you watched.",
  ];

  const [currentTask, setCurrentTask] = useState(0);

  const handleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingTime(0);
      // Simulate recording timer
      const interval = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 30) {
            clearInterval(interval);
            setIsRecording(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setIsRecording(false);
      toast({
        title: "Recording saved",
        description: "Your voice sample has been recorded successfully.",
      });
      
      if (currentTask < tasks.length - 1) {
        setCurrentTask(currentTask + 1);
        setRecordingTime(0);
      } else {
        setIsCompleted(true);
      }
    }
  };

  const handleNext = () => {
    navigate("/assessment/memory");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Voice Recording</h1>
            <div className="text-sm text-muted-foreground">Step 1 of 3</div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-gradient-primary h-2 rounded-full transition-smooth" style={{ width: "33%" }} />
          </div>
        </div>

        <Card className="p-8 bg-gradient-card border-0 shadow-lg mb-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary-light mb-6 relative">
              {isRecording && (
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
              )}
              {isRecording ? (
                <MicOff className="w-12 h-12 text-primary relative z-10" />
              ) : isCompleted ? (
                <CheckCircle2 className="w-12 h-12 text-success relative z-10" />
              ) : (
                <Mic className="w-12 h-12 text-primary relative z-10" />
              )}
            </div>

            {!isCompleted ? (
              <>
                <h2 className="text-2xl font-semibold mb-4 text-card-foreground">
                  Task {currentTask + 1} of {tasks.length}
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {tasks[currentTask]}
                </p>

                <div className="mb-6">
                  {isRecording ? (
                    <div className="text-3xl font-bold text-primary mb-2">
                      {recordingTime}s
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground mb-2">
                      Press the button to start recording
                    </div>
                  )}
                </div>

                <Button
                  variant={isRecording ? "destructive" : "hero"}
                  size="lg"
                  onClick={handleRecording}
                  className="min-w-48"
                >
                  {isRecording ? "Stop Recording" : "Start Recording"}
                </Button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-4 text-card-foreground">
                  Voice Recording Complete!
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Great job! Your voice samples have been recorded. Let's move on to the memory games.
                </p>
                <Button variant="hero" size="lg" onClick={handleNext} className="min-w-48">
                  Continue to Memory Games
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </>
            )}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {tasks.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-smooth ${
                  index <= currentTask ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
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

export default VoiceTest;
