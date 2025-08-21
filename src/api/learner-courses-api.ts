import axiosInstance from "@/lib/axios-instance";
import type { CoursesHome } from "@/lib/types";

export async function fetchAllCourses(): Promise<CoursesHome[]> {
  const response = await axiosInstance.get<{ data: CoursesHome[] }>(
    "all-courses"
  );
  return response.data.data.data;
}
export async function fetchCourseDetails(
  courseId: string
): Promise<CoursesHome> {
  const response = await axiosInstance.get<{ data: CoursesHome }>(
    `course/${courseId}`
  );
  console.log(response.data);
  return response.data.data;
}
export async function fetchInstructorDetails(
  instructorId: string
): Promise<CoursesHome> {
  const response = await axiosInstance.get<{ data: CoursesHome }>(
    `all-instructors/${instructorId}`
  );
  console.log(response.data);
  return response.data.data;
}
