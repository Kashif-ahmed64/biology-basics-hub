import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2, BookOpen, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface GeneratedQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface AIQuizGeneratorProps {
  defaultTopic?: string;
  defaultGrade?: string;
}

const AIQuizGenerator = ({ defaultTopic = "", defaultGrade = "Grade 10" }: AIQuizGeneratorProps) => {
  const [topic, setTopic] = useState(defaultTopic);
  const [grade, setGrade] = useState(defaultGrade);
  const [count, setCount] = useState("5");
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const { toast } = useToast();

  const generateQuiz = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic for the quiz",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setQuizComplete(false);

    try {
      const { data, error } = await supabase.functions.invoke("ai-tutor", {
        body: {
          action: "generate_questions",
          topic,
          grade,
          count: parseInt(count),
        },
      });

      if (error) throw error;

      if (data?.error) {
        toast({
          title: "Generation Error",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      if (data?.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        toast({
          title: "Quiz Generated!",
          description: `${data.questions.length} questions ready for you`,
        });
      } else {
        toast({
          title: "No Questions Generated",
          description: "Try a different topic or try again",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Quiz generation error:", error);
      toast({
        title: "Error",
        description: "Failed to generate quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setQuestions([]);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (questions.length === 0) {
    return (
      <Card className="border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Quiz Generator
          </CardTitle>
          <CardDescription>
            Generate custom quiz questions on any biology topic
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Cell Division, Photosynthesis, Human Heart"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Grade Level</Label>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Grade 9">Grade 9</SelectItem>
                  <SelectItem value="Grade 10">Grade 10</SelectItem>
                  <SelectItem value="Grade 11">Grade 11</SelectItem>
                  <SelectItem value="Grade 12">Grade 12</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Number of Questions</Label>
              <Select value={count} onValueChange={setCount}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Questions</SelectItem>
                  <SelectItem value="5">5 Questions</SelectItem>
                  <SelectItem value="10">10 Questions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={generateQuiz} 
            disabled={isGenerating} 
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Quiz...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Quiz
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <Card className="border-primary/20">
        <CardHeader className="text-center bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardTitle className="flex items-center justify-center gap-2">
            <BookOpen className="h-5 w-5" />
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 text-center space-y-4">
          <div className="text-4xl font-bold text-primary">
            {score}/{questions.length}
          </div>
          <p className="text-lg">
            You scored {percentage}%
          </p>
          <p className="text-muted-foreground">
            {percentage >= 80 ? "Excellent work! 🎉" : 
             percentage >= 60 ? "Good job! Keep practicing 💪" : 
             "Keep studying, you'll improve! 📚"}
          </p>
          <div className="flex gap-2 justify-center">
            <Button onClick={resetQuiz} variant="outline">
              New Quiz
            </Button>
            <Button onClick={() => {
              setCurrentQuestion(0);
              setSelectedAnswer(null);
              setShowResult(false);
              setQuizComplete(false);
              setScore(0);
            }}>
              Retry Same Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const current = questions[currentQuestion];

  return (
    <Card className="border-primary/20">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">
            Question {currentQuestion + 1} of {questions.length}
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mt-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <p className="text-lg font-medium">{current.question}</p>
        
        <div className="space-y-2">
          {current.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={showResult}
              className={`w-full p-3 text-left rounded-lg border transition-all ${
                showResult
                  ? idx === current.correctAnswer
                    ? "bg-green-100 border-green-500 dark:bg-green-900/30"
                    : idx === selectedAnswer
                    ? "bg-red-100 border-red-500 dark:bg-red-900/30"
                    : "bg-muted"
                  : selectedAnswer === idx
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="h-6 w-6 rounded-full border flex items-center justify-center text-sm">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
                {showResult && idx === current.correctAnswer && (
                  <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                )}
                {showResult && idx === selectedAnswer && idx !== current.correctAnswer && (
                  <XCircle className="h-5 w-5 text-red-600 ml-auto" />
                )}
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-medium mb-1">Explanation:</p>
            <p className="text-sm text-muted-foreground">{current.explanation}</p>
          </div>
        )}

        <div className="flex gap-2">
          {!showResult ? (
            <Button 
              onClick={submitAnswer} 
              disabled={selectedAnswer === null}
              className="flex-1"
            >
              Submit Answer
            </Button>
          ) : (
            <Button onClick={nextQuestion} className="flex-1">
              {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
            </Button>
          )}
          <Button variant="outline" onClick={resetQuiz}>
            New Quiz
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIQuizGenerator;
