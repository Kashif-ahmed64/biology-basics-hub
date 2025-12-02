import { useParams, Link } from 'react-router-dom';
import { useBiologyStore } from '@/store/biologyStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BookOpen, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ThreeDCell from '@/components/ThreeDCell';
import Breadcrumbs from '@/components/Breadcrumbs';
import AITutor from '@/components/AITutor';
const Topic = () => {
  const { id } = useParams<{ id: string }>();
  const getTopic = useBiologyStore((state) => state.getTopicById);
  const getChapter = useBiologyStore((state) => state.getChapterById);
  const getNextTopic = useBiologyStore((state) => state.getNextTopic);
  const getPreviousTopic = useBiologyStore((state) => state.getPreviousTopic);
  
  const topic = id ? getTopic(id) : undefined;
  const chapter = topic ? getChapter(topic.chapter) : undefined;
  const nextTopic = id ? getNextTopic(id) : undefined;
  const previousTopic = id ? getPreviousTopic(id) : undefined;

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
      <Breadcrumbs 
        items={[
          { label: 'Chapters', href: '/chapters' },
          { label: chapter?.title || 'Chapter', href: '/chapters' },
          { label: topic.title }
        ]}
      />

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

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/quiz" className="flex-1">
                <Button className="w-full gap-2">
                  <BookOpen className="h-4 w-4" />
                  Test Your Knowledge
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* AI Tutor Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-heading font-bold mb-4">Ask AI Tutor</h2>
          <AITutor topic={topic.title} grade={chapter?.title.includes('9') ? 'Grade 9' : chapter?.title.includes('10') ? 'Grade 10' : chapter?.title.includes('11') ? 'Grade 11' : 'Grade 12'} />
        </div>

        {/* Navigation between topics */}
        <div className="flex justify-between items-center pt-8 border-t">
          {previousTopic ? (
            <Link to={`/topic/${previousTopic.id}`}>
              <Button variant="outline" className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">Previous</div>
                  <div className="font-medium">{previousTopic.title}</div>
                </div>
              </Button>
            </Link>
          ) : (
            <div />
          )}
          
          {nextTopic ? (
            <Link to={`/topic/${nextTopic.id}`}>
              <Button variant="outline" className="gap-2">
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Next</div>
                  <div className="font-medium">{nextTopic.title}</div>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Link to="/chapters">
              <Button variant="outline" className="gap-2">
                Back to Chapters
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topic;
