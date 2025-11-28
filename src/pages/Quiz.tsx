import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import QuizQuestion from '@/components/QuizQuestion';
import { Brain, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

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

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore(score + 1);
    }
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

      <div className="max-w-3xl mx-auto">
        {!showResults ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Question {currentQuestion + 1} of {mockQuestions.length}</span>
              <span>Score: {score}/{mockQuestions.length}</span>
            </div>

            <QuizQuestion
              question={mockQuestions[currentQuestion]}
              onAnswer={handleAnswer}
            />

            <div className="text-center">
              <Button onClick={handleNext} variant="ghost">
                Skip to Next →
              </Button>
            </div>
          </div>
        ) : (
          <Card className="text-center animate-fade-in">
            <CardHeader>
              <CardTitle className="text-3xl font-heading">Quiz Complete! 🎉</CardTitle>
              <CardDescription>Here's how you did:</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl font-bold text-gradient">
                {score}/{mockQuestions.length}
              </div>
              <p className="text-xl text-muted-foreground">
                {score === mockQuestions.length
                  ? 'Perfect score! You\'re a biology expert!'
                  : score >= mockQuestions.length / 2
                  ? 'Great job! Keep learning to improve even more.'
                  : 'Good effort! Review the chapters and try again.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={resetQuiz} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Try Again
                </Button>
                <Link to="/chapters">
                  <Button variant="outline">Review Chapters</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="mt-12 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="font-heading">Quiz Features (Coming Soon)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-left space-y-2 text-muted-foreground">
              <li>✨ Chapter-specific quizzes</li>
              <li>✨ Difficulty levels (Easy, Medium, Hard)</li>
              <li>✨ Progress tracking and analytics</li>
              <li>✨ Timed challenges</li>
              <li>✨ Detailed explanations for all answers</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
