import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Chapter } from '@/store/biologyStore';

interface ChapterCardProps {
  chapter: Chapter;
}

const ChapterCard = ({ chapter }: ChapterCardProps) => {
  return (
    <Card className="card-hover group animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-heading text-gradient group-hover:scale-105 transition-transform">
          {chapter.title}
        </CardTitle>
        <CardDescription>{chapter.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 mb-6">
          {chapter.topics.map((topic) => (
            <Link 
              key={topic.id} 
              to={`/topic/${topic.id}`}
              className="block p-3 rounded-md bg-muted/50 hover:bg-muted transition-colors"
            >
              <p className="font-medium">{topic.title}</p>
              <p className="text-sm text-muted-foreground">{topic.description}</p>
            </Link>
          ))}
        </div>
        <Link to={`/chapters#${chapter.id}`}>
          <Button className="w-full gap-2 group-hover:gap-3 transition-all">
            Explore Chapter
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ChapterCard;
