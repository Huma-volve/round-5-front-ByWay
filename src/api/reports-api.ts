import axiosInstance from "@/lib/axios-instance";

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

interface GeneralStats {
  instructors: number;
  learners: number;
  courses: number;
  earnings: number;
}

interface CourseRating {
  course_name: string;
  avg_rating: number;
}

export interface ReportsData {
  generalStats: GeneralStats;
  courseRatings: CourseRating[];
}

/**
 * Be carful typing requests "get" from server, response shape may change stopping these fns from working. 
 * Data comes nested from server, first we check the type of the repose then we check the type of the data.
 * We can omit this kind of typing and go for lose typing but we loose the strict typing feature in which any kind of response can come.
 * Typing responses will be handful if strict kind of data is expected
 * 
 * Using promise.all to request to end points at the same time then send a unified object to the component
*/

export async function getReportsData(): Promise<ReportsData> {
  try {
    const [statsResponse, ratingsResponse] = await Promise.all([
      //Type on the object GeneralStats that is inside ApiResponse
      axiosInstance.get<ApiResponse<GeneralStats>>("/reports"),
      axiosInstance.get<ApiResponse<CourseRating[]>>("/reports/courses"),
    ]);
    return {
      generalStats: statsResponse.data.data,
      courseRatings: ratingsResponse.data.data,
    };
  } catch (error) {
    console.error("Error fetching reports data:", error);
    throw new Error("Failed to fetch reports data");
  }
}
