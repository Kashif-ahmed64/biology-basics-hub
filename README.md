# BioLearn - Interactive Biology Education Platform

A free, comprehensive biology education website built with React, featuring interactive lessons, 3D visualizations, and engaging quizzes.

## 🧬 Features

- **Home Page**: Welcome section with overview and call-to-action
- **Chapters**: Browse biology topics organized by chapters (Cell Biology, Genetics, Evolution, Ecology)
- **Topic Pages**: Detailed lessons with interactive 3D visualizations using React Three Fiber
- **Quiz System**: Test your knowledge with interactive quizzes and instant feedback
- **Search**: Find chapters and topics across the entire curriculum
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, nature-inspired design with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:8080`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation bar
│   ├── Footer.tsx      # Footer component
│   ├── ChapterCard.tsx # Chapter display card
│   ├── ThreeDCell.tsx  # 3D cell visualization
│   └── QuizQuestion.tsx # Quiz question component
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Chapters.tsx    # Chapters list
│   ├── Topic.tsx       # Individual topic page
│   ├── Quiz.tsx        # Quiz interface
│   └── Search.tsx      # Search functionality
├── store/              # State management
│   └── biologyStore.ts # Zustand store for biology content
├── assets/             # Images and static files
└── styles/             # Tailwind customizations
```

## 🎨 Design System

The project uses a custom design system with:
- **Colors**: Teal and blue primary colors inspired by cellular biology
- **Typography**: Merriweather for headings, Inter for body text
- **Components**: shadcn/ui component library with custom styling
- **Animations**: Smooth fade-in and slide-in effects

## 🛠️ Built With

- **React** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Zustand** - State management
- **React Three Fiber** - 3D visualizations
- **shadcn/ui** - UI components

## 📝 Adding Content

### Adding a New Chapter

Edit `src/store/biologyStore.ts` and add to the `mockChapters` array:

```typescript
{
  id: '5',
  title: 'Your Chapter Title',
  description: 'Chapter description',
  topics: [
    { 
      id: '5-1', 
      title: 'Topic Title', 
      description: 'Topic description', 
      chapter: '5' 
    },
  ]
}
```

### Adding Quiz Questions

Edit `src/pages/Quiz.tsx` and add to the `mockQuestions` array:

```typescript
{
  id: '4',
  text: 'Your question?',
  options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  correctAnswer: 0, // Index of correct answer
  explanation: 'Explanation of the answer',
}
```

## 🎯 Future Enhancements

This is a skeleton project ready for expansion:

- **Backend Integration**: Add user accounts and progress tracking with Lovable Cloud
- **Content Management**: Create an admin panel for managing chapters and quizzes
- **Advanced 3D Models**: Add more detailed 3D visualizations for different topics
- **Video Integration**: Embed educational videos in lessons
- **Interactive Diagrams**: Add clickable, annotated diagrams
- **Gamification**: Add achievements, points, and leaderboards
- **Discussion Forums**: Enable student collaboration
- **Accessibility**: Enhance ARIA labels and keyboard navigation

## 📱 Mobile Support

The application is fully responsive and optimized for mobile devices with:
- Touch-friendly navigation
- Responsive layouts
- Optimized 3D performance
- Mobile-first design approach

## 🤝 Contributing

This is an educational project template. Feel free to:
1. Fork the repository
2. Add your content and features
3. Share with students and educators

## 📄 License

This project is free and open-source, designed for educational purposes.

## 🔗 Links

- **Project URL**: https://lovable.dev/projects/e439d40a-fe3a-435d-a065-cf24ed5bf82b
- **Documentation**: [Lovable Docs](https://docs.lovable.dev/)

## 🎓 Perfect For

- Biology teachers creating digital resources
- Students building study tools
- Educational institutions developing online content
- Self-learners exploring biology

---

Built with ❤️ for biology education
