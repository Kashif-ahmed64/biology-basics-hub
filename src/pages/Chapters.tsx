import { useBiologyStore } from '@/store/biologyStore';
import ChapterCard from '@/components/ChapterCard';
import { BookOpen } from 'lucide-react';

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
