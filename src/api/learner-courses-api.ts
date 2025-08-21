import axiosInstance from "@/lib/axios-instance";
import type { CoursesHome } from "@/lib/types";

export async function CoursesApi(): Promise<CoursesHome[]> {
  const response = await axiosInstance.get<{ data: CoursesHome[] }>(
    "all-courses"
  );
  return response.data.data.data;
}
export async function CourseDetailsApi(courseId: string): Promise<CoursesHome> {
  const response = await axiosInstance.get<{ data: CoursesHome }>(
    `course/${courseId}`
  );
  console.log(response.data)
  return response.data.data;
}
