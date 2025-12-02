import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuizQuestionProps {
  question: {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
}

const QuizQuestion = ({ question, onAnswer, onNext }: QuizQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === question.correctAnswer;
    setShowResult(true);
    onAnswer(isCorrect);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    onNext();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-heading">{question.text}</CardTitle>
        {!showResult && (
          <CardDescription>Select the correct answer</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={selectedAnswer?.toString()}
          onValueChange={(value) => setSelectedAnswer(parseInt(value))}
          disabled={showResult}
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label
                htmlFor={`option-${index}`}
                className={`flex-1 cursor-pointer p-3 rounded-md border transition-colors ${
                  showResult
                    ? index === question.correctAnswer
                      ? 'bg-green-50 border-green-500'
                      : index === selectedAnswer
                      ? 'bg-red-50 border-red-500'
                      : ''
                    : 'hover:bg-muted'
                }`}
              >
                {option}
                {showResult && index === question.correctAnswer && (
                  <CheckCircle2 className="inline-block ml-2 h-5 w-5 text-green-600" />
                )}
                {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                  <XCircle className="inline-block ml-2 h-5 w-5 text-red-600" />
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {showResult && (
          <div className="p-4 rounded-lg bg-muted">
            <p className="font-medium mb-2">
              {selectedAnswer === question.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
            </p>
            <p className="text-sm text-muted-foreground">{question.explanation}</p>
          </div>
        )}

        <div className="flex gap-2">
          {!showResult ? (
            <Button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="flex-1"
            >
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNext} className="flex-1">
              Next Question
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizQuestion;
