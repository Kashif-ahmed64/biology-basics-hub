import { useBiologyStore } from '@/store/biologyStore';
import ChapterCard from '@/components/ChapterCard';
import { BookOpen, GraduationCap, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Chapters = () => {
  const chapters = useBiologyStore((state) => state.chapters);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12 space-y-4 animate-fade-in">
        <div className="flex justify-center">
          <BookOpen className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gradient">
          Biology Curriculum - Sindh Board
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Complete biology curriculum for grades 9-12 based on Sindh Textbook Board Jamshoro. 
          Navigate by grade level or explore topics across all grades.
        </p>
      </div>

      {/* Grade Level Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-6xl mx-auto">
        {[
          { grade: '9th', chapters: chapters.filter(c => c.id.startsWith('9')).length, color: 'from-blue-500/20 to-cyan-500/20' },
          { grade: '10th', chapters: chapters.filter(c => c.id.startsWith('10')).length, color: 'from-green-500/20 to-emerald-500/20' },
          { grade: '11th', chapters: chapters.filter(c => c.id.startsWith('11')).length, color: 'from-purple-500/20 to-pink-500/20' },
          { grade: '12th', chapters: chapters.filter(c => c.id.startsWith('12')).length, color: 'from-orange-500/20 to-red-500/20' },
        ].map((grade) => (
          <Card key={grade.grade} className={`bg-gradient-to-br ${grade.color} text-center`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-heading">{grade.grade} Grade</CardTitle>
              <CardDescription className="text-foreground/80">
                {grade.chapters} Chapter{grade.chapters !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Learning Path Info */}
      <Card className="max-w-3xl mx-auto mb-12 bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Sparkles className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-heading font-semibold text-lg mb-2">Your Learning Journey</h3>
              <p className="text-muted-foreground">
                💡 <strong>Study Guide:</strong> Follow your grade level chapters sequentially, or explore cross-referenced 
                topics to see how concepts build across grades. Each chapter aligns with Sindh Board curriculum!
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
