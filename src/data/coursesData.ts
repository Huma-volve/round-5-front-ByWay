export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string[];
  price: number;
  thumbnail: string;
  introVideo: string;
  createdAt: string;
  updatedAt: string;
  status: "draft" | "published" | "archived";
  totalLessons: number;
  totalDuration: number; // in minutes
  studentsEnrolled: number;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: number; // in minutes
  videoUrl: string;
  materials: LessonMaterial[];
  isPreview: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface LessonMaterial {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
}

// Dummy courses data
export const dummyCourses: Course[] = [
  {
    id: "course-1",
    title: "Complete React Development Course",
    description:
      "Learn React from basics to advanced concepts with hands-on projects",
    category: "Programming",
    level: ["beginner", "intermediate"],
    price: 99.99,
    thumbnail: "/images/react-course.jpg",
    introVideo: "/videos/react-intro.mp4",
    createdAt: "2025-01-15",
    updatedAt: "2025-02-10",
    status: "published",
    totalLessons: 3,
    totalDuration: 90, // 1h 30min (25+35+30)
    studentsEnrolled: 245,
  },
  {
    id: "course-2",
    title: "Advanced TypeScript Patterns",
    description: "Master advanced TypeScript concepts and design patterns",
    category: "Programming",
    level: ["advanced"],
    price: 149.99,
    thumbnail: "/images/typescript-course.jpg",
    introVideo: "/videos/typescript-intro.mp4",
    createdAt: "2025-02-01",
    updatedAt: "2025-02-15",
    status: "draft",
    totalLessons: 8,
    totalDuration: 320, // 5.3 hours
    studentsEnrolled: 0,
  },
  {
    id: "course-3",
    title: "UI/UX Design Fundamentals",
    description:
      "Learn the principles of user interface and user experience design",
    category: "Design",
    level: ["beginner"],
    price: 79.99,
    thumbnail: "/images/design-course.jpg",
    introVideo: "/videos/design-intro.mp4",
    createdAt: "2025-01-20",
    updatedAt: "2025-02-05",
    status: "published",
    totalLessons: 15,
    totalDuration: 600, // 10 hours
    studentsEnrolled: 156,
  },
];

// Dummy lessons data
export const dummyLessons: Lesson[] = [
  // Course 1 lessons (React) - Reduced to 3 lessons
  {
    id: "lesson-1-1",
    courseId: "course-1",
    title: "Introduction to React",
    description: "Understanding what React is and why it's popular",
    duration: 25,
    videoUrl: "/videos/react-lesson-1.mp4",
    materials: [
      {
        id: "mat-1-1",
        name: "React Introduction Slides.pdf",
        type: "application/pdf",
        url: "/materials/react-intro-slides.pdf",
        size: 2048000,
      },
    ],
    isPreview: false,
    order: 1,
    createdAt: "2025-01-15",
    updatedAt: "2025-01-15",
  },
  {
    id: "lesson-1-2",
    courseId: "course-1",
    title: "Setting Up Development Environment",
    description: "Installing Node.js, React, and setting up your first project",
    duration: 35,
    videoUrl: "/videos/react-lesson-2.mp4",
    materials: [
      {
        id: "mat-1-2",
        name: "Setup Guide.pdf",
        type: "application/pdf",
        url: "/materials/setup-guide.pdf",
        size: 1536000,
      },
    ],
    isPreview: false,
    order: 2,
    createdAt: "2025-01-16",
    updatedAt: "2025-01-16",
  },
  {
    id: "lesson-1-3",
    courseId: "course-1",
    title: "JSX and Components",
    description: "Learning JSX syntax and creating your first React components",
    duration: 30,
    videoUrl: "/videos/react-lesson-3.mp4",
    materials: [],
    isPreview: false,
    order: 3,
    createdAt: "2025-01-17",
    updatedAt: "2025-01-17",
  },
  // Course 2 lessons (TypeScript)
  {
    id: "lesson-2-1",
    courseId: "course-2",
    title: "Advanced Type Systems",
    description: "Deep dive into TypeScript's advanced type features",
    duration: 45,
    videoUrl: "/videos/ts-lesson-1.mp4",
    materials: [
      {
        id: "mat-2-1",
        name: "Type Systems Guide.pdf",
        type: "application/pdf",
        url: "/materials/type-systems.pdf",
        size: 3072000,
      },
    ],
    isPreview: true,
    order: 1,
    createdAt: "2025-02-01",
    updatedAt: "2025-02-01",
  },
  {
    id: "lesson-2-2",
    courseId: "course-2",
    title: "Generic Patterns",
    description: "Mastering TypeScript generics and utility types",
    duration: 50,
    videoUrl: "/videos/ts-lesson-2.mp4",
    materials: [],
    isPreview: false,
    order: 2,
    createdAt: "2025-02-02",
    updatedAt: "2025-02-02",
  },
  // Course 3 lessons (Design)
  {
    id: "lesson-3-1",
    courseId: "course-3",
    title: "Design Principles",
    description: "Understanding the fundamental principles of good design",
    duration: 30,
    videoUrl: "/videos/design-lesson-1.mp4",
    materials: [
      {
        id: "mat-3-1",
        name: "Design Principles Checklist.pdf",
        type: "application/pdf",
        url: "/materials/design-principles.pdf",
        size: 1024000,
      },
    ],
    isPreview: true,
    order: 1,
    createdAt: "2025-01-20",
    updatedAt: "2025-01-20",
  },
];

// Helper functions
export const getCourseById = (courseId: string): Course | undefined => {
  return dummyCourses.find((course) => course.id === courseId);
};

export const getLessonsByCourseId = (courseId: string): Lesson[] => {
  return dummyLessons
    .filter((lesson) => lesson.courseId === courseId)
    .sort((a, b) => a.order - b.order);
};

export const getLessonById = (lessonId: string): Lesson | undefined => {
  return dummyLessons.find((lesson) => lesson.id === lessonId);
};

export const getInstructorCourses = (): Course[] => {
  return dummyCourses; // In real app, filter by instructor ID
};
