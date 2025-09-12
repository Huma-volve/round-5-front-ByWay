export interface UpdateCourseStatusProps {
  courseId: string;
  status: "published" | "draft" | "pending";
}
