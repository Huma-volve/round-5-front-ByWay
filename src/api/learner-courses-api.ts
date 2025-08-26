import axiosInstance from "@/lib/axios-instance";
import type { CoursesHome, StatsHome } from "@/lib/types";

interface AllCoursesResponse {
  data: {
    courses: CoursesHome[] | PromiseLike<CoursesHome[]>;
    data: CoursesHome[];
  };
}
export async function fetchStatsHome() {
  const response = await axiosInstance.get<{ data: StatsHome }>(
    "learner/platform-analytics"
  );
  return response.data.data;
}
export async function fetchCategoriesCourses() {
  const response = await axiosInstance.get("categories-for-platform");
  return response.data.data;
}
export async function fetchAllCourses(): Promise<CoursesHome[]> {
  const response = await axiosInstance.get<AllCoursesResponse>("all-courses");
  return response.data.data.courses;
}
export async function fetchCourseDetails(
  courseId: string
): Promise<CoursesHome> {
  const response = await axiosInstance.get<{ data: CoursesHome }>(
    `course/${courseId}`
  );
  return response.data.data;
}
export async function fetchInstructorDetails(
  instructorId: string
): Promise<CoursesHome> {
  const response = await axiosInstance.get<{ data: CoursesHome }>(
    `all-instructors/${instructorId}`
  );
  return response.data.data;
}
export async function fetchMyCourses(): Promise<CoursesHome[]> {
  const response = await axiosInstance.get<{
    data: { courses: CoursesHome[] };
  }>("learner/courses");
  return response.data.data.courses;
}
export async function fetchMyCoursesDetails(courseId: string) {
  const response = await axiosInstance.get(
    `learner/courses/${courseId}/enrolled`
  );
  return response.data.data;
}
