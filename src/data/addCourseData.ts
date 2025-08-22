export interface CourseData {
  courseTitle: string;
  courseCategory: number;
  courseDescription: string;
  coursePrice: number;
  courseThumbnail: File | null;
  introVideo: File | null;
}
