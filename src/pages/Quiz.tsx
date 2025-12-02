import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import QuizQuestion from '@/components/QuizQuestion';
import { Brain, RotateCcw, TrendingUp, Award, BookOpen, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProgressBar from '@/components/ProgressBar';
import { toast } from 'sonner';
import AIQuizGenerator from '@/components/AIQuizGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
const mockQuestions = [
  {
    id: '1',
    text: 'What is the powerhouse of the cell?',
    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi Apparatus'],
    correctAnswer: 1,
    explanation: 'Mitochondria are called the powerhouse of the cell because they produce ATP, the energy currency of cells through cellular respiration.',
  },
  {
    id: '2',
    text: 'Which molecule carries genetic information in most organisms?',
    options: ['RNA', 'Protein', 'DNA', 'Lipid'],
    correctAnswer: 2,
    explanation: 'DNA (Deoxyribonucleic acid) is the molecule that carries genetic information in most living organisms.',
  },
  {
    id: '3',
    text: 'What is the process by which plants make their own food?',
    options: ['Respiration', 'Photosynthesis', 'Fermentation', 'Digestion'],
    correctAnswer: 1,
    explanation: 'Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to produce oxygen and energy in the form of sugar.',
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    new Array(mockQuestions.length).fill(false)
  );

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore(score + 1);
      toast.success('Correct! Well done! 🎉');
    } else {
      toast.error('Not quite right. Keep learning!');
    }
    
    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setAnsweredQuestions(new Array(mockQuestions.length).fill(false));
  };

  const getPerformanceMessage = () => {
    const percentage = (score / mockQuestions.length) * 100;
    if (percentage === 100) return { emoji: '🏆', message: 'Perfect score! You\'re a biology expert!' };
    if (percentage >= 80) return { emoji: '🌟', message: 'Excellent work! You have a strong understanding!' };
    if (percentage >= 60) return { emoji: '👍', message: 'Good job! Keep studying to improve further.' };
    return { emoji: '📚', message: 'Keep learning! Review the chapters and try again.' };
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12 space-y-4 animate-fade-in">
        <div className="flex justify-center">
          <Brain className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gradient">
          Biology Quiz
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Test your knowledge and reinforce your learning with interactive quizzes
        </p>
      </div>

      <Tabs defaultValue="ai-quiz" className="max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="ai-quiz" className="gap-2">
            <Sparkles className="h-4 w-4" />
            AI Generated Quiz
          </TabsTrigger>
          <TabsTrigger value="practice" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Practice Quiz
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai-quiz">
          <AIQuizGenerator />
        </TabsContent>

        <TabsContent value="practice">
        {!showResults ? (
          <div className="space-y-6">
            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <ProgressBar 
                  current={currentQuestion + 1} 
                  total={mockQuestions.length}
                  label="Quiz Progress"
                />
                <div className="flex justify-between items-center mt-4 text-sm">
                  <span className="text-muted-foreground">Current Score</span>
                  <span className="font-bold text-lg text-primary">{score}/{currentQuestion}</span>
                </div>
              </CardContent>
            </Card>

            <QuizQuestion
              question={mockQuestions[currentQuestion]}
              onAnswer={handleAnswer}
              onNext={handleNext}
            />

            <div className="flex justify-between items-center">
              <Button 
                onClick={handleNext} 
                variant="ghost"
                disabled={!answeredQuestions[currentQuestion]}
              >
                {currentQuestion === mockQuestions.length - 1 ? 'See Results' : 'Skip to Next'} →
              </Button>
              <span className="text-sm text-muted-foreground">
                {answeredQuestions[currentQuestion] ? '✓ Answered' : 'Answer to continue'}
              </span>
            </div>
          </div>
        ) : (
          <Card className="text-center animate-fade-in">
            <CardHeader>
              <div className="text-6xl mb-4">{getPerformanceMessage().emoji}</div>
              <CardTitle className="text-3xl font-heading">Quiz Complete!</CardTitle>
              <CardDescription>Here's your performance summary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-3xl font-bold">{score}</div>
                    <div className="text-sm text-muted-foreground">Correct Answers</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-3xl font-bold">
                      {Math.round((score / mockQuestions.length) * 100)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Score</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <Brain className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-3xl font-bold">{mockQuestions.length}</div>
                    <div className="text-sm text-muted-foreground">Total Questions</div>
                  </CardContent>
                </Card>
              </div>

              <div className="p-6 bg-muted/50 rounded-lg">
                <p className="text-lg font-medium mb-2">{getPerformanceMessage().message}</p>
                <ProgressBar 
                  current={score} 
                  total={mockQuestions.length}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={resetQuiz} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Try Again
                </Button>
                <Link to="/chapters">
                  <Button variant="outline" className="gap-2">
                    <BookOpen className="h-4 w-4" />
                    Review Chapters
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {!showResults && (
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="font-heading flex items-center justify-center gap-2">
                  <Brain className="h-5 w-5" />
                  Study Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-left space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">💡</span>
                    <span>Read the explanation carefully after each question to learn from mistakes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">📚</span>
                    <span>Review chapter content before taking the quiz for better results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">🎯</span>
                    <span>Take your time - there's no time limit, focus on understanding</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Quiz;
