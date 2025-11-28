import { useState, useMemo } from 'react';
import { useBiologyStore } from '@/store/biologyStore';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search as SearchIcon, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const chapters = useBiologyStore((state) => state.chapters);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    const results: Array<{
      type: 'chapter' | 'topic';
      id: string;
      title: string;
      description: string;
      chapterId?: string;
    }> = [];

    chapters.forEach((chapter) => {
      // Search in chapters
      if (
        chapter.title.toLowerCase().includes(lowerQuery) ||
        chapter.description.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          type: 'chapter',
          id: chapter.id,
          title: chapter.title,
          description: chapter.description,
        });
      }

      // Search in topics
      chapter.topics.forEach((topic) => {
        if (
          topic.title.toLowerCase().includes(lowerQuery) ||
          topic.description.toLowerCase().includes(lowerQuery)
        ) {
          results.push({
            type: 'topic',
            id: topic.id,
            title: topic.title,
            description: topic.description,
            chapterId: chapter.id,
          });
        }
      });
    });

    return results;
  }, [query, chapters]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12 space-y-4 animate-fade-in">
        <div className="flex justify-center">
          <SearchIcon className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gradient">
          Search Biology Topics
        </h1>
        <p className="text-xl text-muted-foreground">
          Find chapters, topics, and lessons across our entire biology curriculum
        </p>
      </div>

      <div className="space-y-8">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for topics, chapters, concepts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 text-lg py-6"
          />
        </div>

        {query.trim() && (
          <div className="space-y-4 animate-fade-in">
            <p className="text-sm text-muted-foreground">
              Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
            </p>

            {searchResults.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    No results found for "{query}". Try different keywords or browse our{' '}
                    <Link to="/chapters" className="text-primary hover:underline">
                      chapters
                    </Link>
                    .
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {searchResults.map((result, index) => (
                  <Link
                    key={`${result.type}-${result.id}`}
                    to={result.type === 'topic' ? `/topic/${result.id}` : '/chapters'}
                    className="block"
                  >
                    <Card className="card-hover animate-slide-in" style={{ animationDelay: `${index * 0.05}s` }}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-xl font-heading flex items-center gap-2">
                              <BookOpen className="h-5 w-5 text-primary" />
                              {result.title}
                            </CardTitle>
                            <CardDescription className="mt-2">
                              {result.description}
                            </CardDescription>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {result.type}
                          </span>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {!query.trim() && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="font-heading">Quick Tips for Searching</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>🔍 Use specific terms like "mitochondria" or "photosynthesis"</li>
                <li>🔍 Search for chapter names like "Cell Biology" or "Genetics"</li>
                <li>🔍 Try searching for processes like "cellular respiration"</li>
                <li>🔍 Look for organisms like "bacteria" or "plants"</li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Search;
