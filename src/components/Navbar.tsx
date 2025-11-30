import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Microscope, BookOpen, Search, Brain } from 'lucide-react';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Microscope className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
            <span className="text-2xl font-heading font-bold text-gradient">BioLearn</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/">
              <Button
                variant={isActive('/') ? 'default' : 'ghost'}
                className="gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link to="/chapters">
              <Button
                variant={isActive('/chapters') ? 'default' : 'ghost'}
                className="gap-2"
              >
                <Brain className="h-4 w-4" />
                Chapters
              </Button>
            </Link>
            <Link to="/quiz">
              <Button
                variant={isActive('/quiz') ? 'default' : 'ghost'}
                className="gap-2"
              >
                <Microscope className="h-4 w-4" />
                Quiz
              </Button>
            </Link>
            <Link to="/search">
              <Button
                variant={isActive('/search') ? 'default' : 'ghost'}
                size="icon"
              >
                <Search className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Link to="/search">
              <Button variant="ghost" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </Link>
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
