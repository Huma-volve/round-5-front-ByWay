import axiosInstance from "@/lib/axios-instance";
import type { CoursesHome } from "@/lib/types";

interface AllCoursesResponse {
  data: {
    data: CoursesHome[];
  };
}

export async function fetchAllCourses(): Promise<CoursesHome[]> {
  const response = await axiosInstance.get<AllCoursesResponse>(
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
