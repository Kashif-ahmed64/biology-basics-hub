import { useParams, Link } from 'react-router-dom';
import { useBiologyStore } from '@/store/biologyStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BookOpen } from 'lucide-react';
import ThreeDCell from '@/components/ThreeDCell';

const Topic = () => {
  const { id } = useParams<{ id: string }>();
  const getTopic = useBiologyStore((state) => state.getTopicById);
  const topic = id ? getTopic(id) : undefined;

  if (!topic) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-heading font-bold mb-4">Topic Not Found</h1>
        <Link to="/chapters">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Chapters
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link to="/chapters">
        <Button variant="ghost" className="gap-2 mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Chapters
        </Button>
      </Link>

      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-4">
            {topic.title}
          </h1>
          <p className="text-xl text-muted-foreground">{topic.description}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-heading">
              <BookOpen className="h-5 w-5 text-primary" />
              Lesson Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <h3 className="font-heading text-2xl mb-4">Overview</h3>
              <p className="text-muted-foreground leading-relaxed">
                This is a placeholder for detailed lesson content about {topic.title}. 
                In a full implementation, this section would contain:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>Detailed explanations of key concepts</li>
                <li>Interactive diagrams and illustrations</li>
                <li>Real-world examples and applications</li>
                <li>Video content and animations</li>
                <li>Practice problems and exercises</li>
              </ul>

              <h3 className="font-heading text-2xl mt-8 mb-4">Interactive Visualization</h3>
              <p className="text-muted-foreground mb-4">
                Experience biology in 3D with our interactive models:
              </p>
            </div>

            <ThreeDCell />

            <div className="prose prose-lg max-w-none">
              <h3 className="font-heading text-2xl mb-4">Key Takeaways</h3>
              <div className="bg-muted/50 p-6 rounded-lg">
                <ul className="space-y-2 text-muted-foreground">
                  <li>📌 Core concept 1: Understanding the fundamentals</li>
                  <li>📌 Core concept 2: Practical applications</li>
                  <li>📌 Core concept 3: Advanced topics and connections</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Link to="/quiz" className="flex-1">
                <Button className="w-full">Test Your Knowledge</Button>
              </Link>
              <Link to="/chapters" className="flex-1">
                <Button variant="outline" className="w-full">Next Topic</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Topic;
