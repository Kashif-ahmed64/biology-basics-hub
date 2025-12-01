import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Microscope, BookOpen, Brain, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-biology.jpg';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
          }}
        />
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-gradient">
              Discover the Wonder of Life
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Free, interactive biology education that brings science to life through 
              engaging lessons, 3D visualizations, and hands-on learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link to="/chapters">
                <Button size="lg" className="gap-2 text-lg">
                  <BookOpen className="h-5 w-5" />
                  Start Learning
                </Button>
              </Link>
              <Link to="/quiz">
                <Button size="lg" variant="outline" className="gap-2 text-lg">
                  <Brain className="h-5 w-5" />
                  Take a Quiz
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
          Why BioLearn?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="card-hover animate-fade-in">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="font-heading">Grade 9-12 Curriculum</CardTitle>
              <CardDescription>
                Complete Sindh Board biology curriculum from 9th to 12th grade with 
                cross-referenced topics and comprehensive coverage.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-hover animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <Microscope className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="font-heading">3D Human Anatomy</CardTitle>
              <CardDescription>
                Explore interactive 3D models of the human body from skin to skeleton,
                muscles to organs with detailed information.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-hover animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <Brain className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="font-heading">First Aid Training</CardTitle>
              <CardDescription>
                Learn essential life-saving skills including CPR, bleeding control,
                and emergency medical procedures.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4 text-center space-y-6">
          <Sparkles className="h-12 w-12 text-primary mx-auto" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Ready to Explore Biology?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students worldwide in discovering the fascinating world 
            of living organisms and their interactions.
          </p>
          <Link to="/chapters">
            <Button size="lg" className="gap-2">
              Browse All Chapters
              <BookOpen className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
