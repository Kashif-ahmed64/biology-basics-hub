import { useBiologyStore } from '@/store/biologyStore';
import ChapterCard from '@/components/ChapterCard';
import { BookOpen, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Chapters = () => {
  const chapters = useBiologyStore((state) => state.chapters);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12 space-y-4 animate-fade-in">
        <div className="flex justify-center">
          <BookOpen className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gradient">
          Biology Chapters
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore comprehensive chapters covering all major topics in biology. 
          Each chapter contains multiple lessons with interactive content.
        </p>
      </div>

      {/* Learning Path Info */}
      <Card className="max-w-3xl mx-auto mb-12 bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <GraduationCap className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-heading font-semibold text-lg mb-2">Your Learning Journey</h3>
              <p className="text-muted-foreground">
                Start with Cell Biology and progress through each chapter. Topics are organized sequentially 
                for optimal learning. Click any topic to begin your lesson!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            className="animate-slide-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ChapterCard chapter={chapter} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chapters;
