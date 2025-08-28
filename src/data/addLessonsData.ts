export interface LessonMaterialInput {
  name: string;
  type: "link" | "pdf" | "doc";
  url?: string;
  file?: File | null;
}

export interface LessonData {
  lessonTitle: string;
  lessonDescription: string;
  lessonDuration: number; // in minutes
  lessonVideo: File | null;
  // Structured material entries with name, type, and either url or file
  materials?: LessonMaterialInput[];
  isPreview?: boolean;
}

export interface AddLessonsData {
  courseId?: string;
  lessons: LessonData[];
}

export const lessonTypes = [
  { id: "video", label: "Video Lesson" },
  { id: "quiz", label: "Quiz" },
  { id: "assignment", label: "Assignment" },
  { id: "reading", label: "Reading Material" },
];

export const supportedVideoFormats = [
  "video/mp4",
  "video/avi",
  "video/mov",
  "video/wmv",
  "video/mkv",
];

export const supportedMaterialFormats = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "image/jpeg",
  "image/png",
  "image/gif",
];
