import { create } from 'zustand';

export interface Topic {
  id: string;
  title: string;
  description: string;
  chapter: string;
  content?: string;
  nextTopicId?: string;
  previousTopicId?: string;
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
  getNextTopic: (currentTopicId: string) => Topic | undefined;
  getPreviousTopic: (currentTopicId: string) => Topic | undefined;
}

// Mock data organized by grade level (Sindh Board structure)
const mockChapters: Chapter[] = [
  // Grade 9 Chapters
  {
    id: '9-1',
    title: 'Introduction to Biology (Grade 9)',
    description: 'Understanding the scope, branches, and applications of biology in daily life.',
    topics: [
      { 
        id: '9-1-1', 
        title: 'Branches of Biology', 
        description: 'Study of various biological disciplines', 
        chapter: '9-1',
        nextTopicId: '9-1-2'
      },
      { 
        id: '9-1-2', 
        title: 'Scientific Method', 
        description: 'Steps in biological research', 
        chapter: '9-1',
        previousTopicId: '9-1-1',
        nextTopicId: '9-2-1'
      },
    ]
  },
  {
    id: '9-2',
    title: 'Solving a Biological Problem (Grade 9)',
    description: 'Learn how to identify and solve biological problems systematically.',
    topics: [
      { 
        id: '9-2-1', 
        title: 'Biological Problem Solving', 
        description: 'Steps to approach biological questions', 
        chapter: '9-2',
        previousTopicId: '9-1-2',
        nextTopicId: '9-3-1'
      },
    ]
  },
  {
    id: '9-3',
    title: 'Biodiversity (Grade 9)',
    description: 'Classification and diversity of living organisms.',
    topics: [
      { 
        id: '9-3-1', 
        title: 'Five Kingdom System', 
        description: 'Classification of organisms', 
        chapter: '9-3',
        previousTopicId: '9-2-1',
        nextTopicId: '9-4-1'
      },
    ]
  },
  {
    id: '9-4',
    title: 'Cells and Tissues (Grade 9)',
    description: 'Structure and function of cells and tissue organization.',
    topics: [
      { 
        id: '9-4-1', 
        title: 'Cell Structure', 
        description: 'Organelles and their functions', 
        chapter: '9-4',
        previousTopicId: '9-3-1',
        nextTopicId: '9-4-2'
      },
      { 
        id: '9-4-2', 
        title: 'Cell Membrane', 
        description: 'Structure and transport mechanisms', 
        chapter: '9-4',
        previousTopicId: '9-4-1',
        nextTopicId: '10-1-1'
      },
    ]
  },

  // Grade 10 Chapters
  {
    id: '10-1',
    title: 'Gaseous Exchange (Grade 10)',
    description: 'Respiratory system and mechanisms of breathing.',
    topics: [
      { 
        id: '10-1-1', 
        title: 'Human Respiratory System', 
        description: 'Structure and function of lungs', 
        chapter: '10-1',
        previousTopicId: '9-4-2',
        nextTopicId: '10-1-2'
      },
      { 
        id: '10-1-2', 
        title: 'Breathing Mechanism', 
        description: 'Inhalation and exhalation process', 
        chapter: '10-1',
        previousTopicId: '10-1-1',
        nextTopicId: '10-2-1'
      },
    ]
  },
  {
    id: '10-2',
    title: 'Homeostasis (Grade 10)',
    description: 'Maintaining internal balance in living organisms.',
    topics: [
      { 
        id: '10-2-1', 
        title: 'Temperature Regulation', 
        description: 'Thermoregulation in humans', 
        chapter: '10-2',
        previousTopicId: '10-1-2',
        nextTopicId: '10-3-1'
      },
    ]
  },
  {
    id: '10-3',
    title: 'Support and Movement (Grade 10)',
    description: 'Skeletal and muscular systems.',
    topics: [
      { 
        id: '10-3-1', 
        title: 'Skeletal System', 
        description: 'Bones and joints', 
        chapter: '10-3',
        previousTopicId: '10-2-1',
        nextTopicId: '11-1-1'
      },
    ]
  },

  // Grade 11 Chapters
  {
    id: '11-1',
    title: 'Kingdom Animalia (Grade 11)',
    description: 'Classification and characteristics of animals.',
    topics: [
      { 
        id: '11-1-1', 
        title: 'Animal Classification', 
        description: 'Major phyla and their features', 
        chapter: '11-1',
        previousTopicId: '10-3-1',
        nextTopicId: '11-2-1'
      },
    ]
  },
  {
    id: '11-2',
    title: 'Biological Molecules (Grade 11)',
    description: 'Chemistry of life - carbohydrates, proteins, lipids, and nucleic acids.',
    topics: [
      { 
        id: '11-2-1', 
        title: 'Carbohydrates', 
        description: 'Structure and functions', 
        chapter: '11-2',
        previousTopicId: '11-1-1',
        nextTopicId: '11-2-2'
      },
      { 
        id: '11-2-2', 
        title: 'Proteins and Enzymes', 
        description: 'Amino acids and enzyme action', 
        chapter: '11-2',
        previousTopicId: '11-2-1',
        nextTopicId: '11-3-1'
      },
    ]
  },
  {
    id: '11-3',
    title: 'Enzymes (Grade 11)',
    description: 'Biological catalysts and their mechanisms.',
    topics: [
      { 
        id: '11-3-1', 
        title: 'Enzyme Activity', 
        description: 'Factors affecting enzymes', 
        chapter: '11-3',
        previousTopicId: '11-2-2',
        nextTopicId: '12-1-1'
      },
    ]
  },

  // Grade 12 Chapters
  {
    id: '12-1',
    title: 'Nutrition (Grade 12)',
    description: 'Modes of nutrition and digestive system.',
    topics: [
      { 
        id: '12-1-1', 
        title: 'Human Digestive System', 
        description: 'Organs and digestion process', 
        chapter: '12-1',
        previousTopicId: '11-3-1',
        nextTopicId: '12-1-2'
      },
      { 
        id: '12-1-2', 
        title: 'Absorption and Assimilation', 
        description: 'Nutrient uptake mechanisms', 
        chapter: '12-1',
        previousTopicId: '12-1-1',
        nextTopicId: '12-2-1'
      },
    ]
  },
  {
    id: '12-2',
    title: 'Growth and Development (Grade 12)',
    description: 'Cell division, growth patterns, and development.',
    topics: [
      { 
        id: '12-2-1', 
        title: 'Mitosis and Meiosis', 
        description: 'Cell division processes', 
        chapter: '12-2',
        previousTopicId: '12-1-2',
        nextTopicId: '12-3-1'
      },
    ]
  },
  {
    id: '12-3',
    title: 'Reproduction (Grade 12)',
    description: 'Reproductive systems and processes.',
    topics: [
      { 
        id: '12-3-1', 
        title: 'Human Reproduction', 
        description: 'Male and female reproductive systems', 
        chapter: '12-3',
        previousTopicId: '12-2-1',
        nextTopicId: '12-4-1'
      },
    ]
  },
  {
    id: '12-4',
    title: 'Inheritance (Grade 12)',
    description: 'Genetics and patterns of inheritance.',
    topics: [
      { 
        id: '12-4-1', 
        title: 'Mendelian Genetics', 
        description: 'Laws of inheritance', 
        chapter: '12-4',
        previousTopicId: '12-3-1',
        nextTopicId: '12-4-2'
      },
      { 
        id: '12-4-2', 
        title: 'DNA and Gene Expression', 
        description: 'Molecular basis of heredity', 
        chapter: '12-4',
        previousTopicId: '12-4-1'
      },
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
  getNextTopic: (currentTopicId) => {
    const currentTopic = get().getTopicById(currentTopicId);
    if (currentTopic?.nextTopicId) {
      return get().getTopicById(currentTopic.nextTopicId);
    }
    return undefined;
  },
  getPreviousTopic: (currentTopicId) => {
    const currentTopic = get().getTopicById(currentTopicId);
    if (currentTopic?.previousTopicId) {
      return get().getTopicById(currentTopic.previousTopicId);
    }
    return undefined;
  },
}));
