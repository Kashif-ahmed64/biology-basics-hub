import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, BookOpen, Brain, Microscope, Search, Home, User } from 'lucide-react';

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/chapters', label: 'Chapters', icon: BookOpen },
    { path: '/anatomy', label: '3D Anatomy', icon: User },
    { path: '/quiz', label: 'Quiz', icon: Brain },
    { path: '/search', label: 'Search', icon: Search },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Microscope className="h-5 w-5 text-primary" />
            BioLearn
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-2 mt-8">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path} onClick={() => setOpen(false)}>
              <Button
                variant={isActive(item.path) ? 'default' : 'ghost'}
                className="w-full justify-start gap-2"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
