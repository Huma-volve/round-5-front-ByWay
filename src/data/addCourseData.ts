import { t } from "i18next";

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

export const courseLevels = [
  { id: "beginner", label: t("instructor.addCourse.courseLevel.beginner") },
  { id: "intermediate", label: t("instructor.addCourse.courseLevel.intermediate") },
  { id: "advanced", label: t("instructor.addCourse.courseLevel.advanced") },
];
