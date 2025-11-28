import { create } from 'zustand';

export interface Topic {
  id: string;
  title: string;
  description: string;
  chapter: string;
  content?: string;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
}

interface BiologyStore {
  chapters: Chapter[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  getTopicById: (id: string) => Topic | undefined;
  getChapterById: (id: string) => Chapter | undefined;
}

// Mock data for placeholder
const mockChapters: Chapter[] = [
  {
    id: '1',
    title: 'Cell Biology',
    description: 'Explore the fundamental units of life - cells, their structures, and functions.',
    topics: [
      { id: '1-1', title: 'Cell Structure', description: 'Learn about organelles and their roles', chapter: '1' },
      { id: '1-2', title: 'Cell Membrane', description: 'Understanding the selective barrier', chapter: '1' },
      { id: '1-3', title: 'Cellular Respiration', description: 'Energy production in cells', chapter: '1' },
    ]
  },
  {
    id: '2',
    title: 'Genetics',
    description: 'Discover how traits are inherited and the role of DNA in living organisms.',
    topics: [
      { id: '2-1', title: 'DNA Structure', description: 'The double helix and genetic code', chapter: '2' },
      { id: '2-2', title: 'Gene Expression', description: 'From DNA to proteins', chapter: '2' },
      { id: '2-3', title: 'Inheritance Patterns', description: 'Mendelian genetics', chapter: '2' },
    ]
  },
  {
    id: '3',
    title: 'Evolution',
    description: 'Understand the mechanisms of evolution and natural selection.',
    topics: [
      { id: '3-1', title: 'Natural Selection', description: 'Darwin\'s theory of evolution', chapter: '3' },
      { id: '3-2', title: 'Adaptation', description: 'How organisms fit their environment', chapter: '3' },
      { id: '3-3', title: 'Speciation', description: 'Formation of new species', chapter: '3' },
    ]
  },
  {
    id: '4',
    title: 'Ecology',
    description: 'Study the interactions between organisms and their environment.',
    topics: [
      { id: '4-1', title: 'Ecosystems', description: 'Communities and their environments', chapter: '4' },
      { id: '4-2', title: 'Food Chains', description: 'Energy flow in nature', chapter: '4' },
      { id: '4-3', title: 'Biodiversity', description: 'Variety of life on Earth', chapter: '4' },
    ]
  },
];

export const useBiologyStore = create<BiologyStore>((set, get) => ({
  chapters: mockChapters,
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  getTopicById: (id) => {
    const chapters = get().chapters;
    for (const chapter of chapters) {
      const topic = chapter.topics.find(t => t.id === id);
      if (topic) return topic;
    }
    return undefined;
  },
  getChapterById: (id) => {
    return get().chapters.find(c => c.id === id);
  },
}));
