export interface CourseData {
  courseTitle: string;
  courseCategory: string;
  courseLevel: string[];
  courseDescription: string;
  videoTitle: string;
  coursePrice: number;
  courseThumbnail: File | null;
  introVideo: File | null;
}
