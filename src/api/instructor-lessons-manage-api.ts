import axiosInstance from "@/lib/axios-instance";
import type { AxiosError } from "axios";
import type {
  CreateLessonInput,
  LessonResponse,
  LessonsListResponse,
  UpdateLessonInput,
} from "@/lib/types";

// Get all lessons for a course
export async function getLessonsByCourseId(courseId: string) {
  try {
    const response = await axiosInstance.get<LessonsListResponse>(
      `instructor/course-management/courses/${courseId}/lessons`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage =
      axiosError.response?.data?.message || "Failed to fetch lessons";
    throw new Error(errorMessage);
  }
}

// Get a single lesson by id
export async function getLessonById(
  courseId: string,
  lessonId: string | number
) {
  try {
    const response = await axiosInstance.get<LessonResponse>(
      `instructor/course-management/courses/${courseId}/lessons/${lessonId}`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage =
      axiosError.response?.data?.message || "Failed to fetch lesson";
    throw new Error(errorMessage);
  }
}

// Create a new lesson (or multiple - call this per lesson from UI)
export async function createLesson(
  courseId: string,
  lessonData: CreateLessonInput
) {
  try {
    const formData = new FormData();
    formData.append("title", lessonData.title);
    formData.append("description", lessonData.description);
    if (lessonData.video) {
      formData.append("video", lessonData.video);
    }
    if (
      lessonData.video_duration !== undefined &&
      lessonData.video_duration !== null
    ) {
      formData.append("video_duration", String(lessonData.video_duration));
    }
    if (lessonData.order !== undefined && lessonData.order !== null) {
      formData.append("order", String(lessonData.order));
    }

    // ⚠️ MATERIALS: Only process link-type materials (file upload disabled)
    if (Array.isArray(lessonData.materials)) {
      (
        lessonData.materials as Array<{
          name: string;
          type: "link" | "pdf" | "doc";
          url?: string;
          file?: File | null;
        }>
      ).forEach((m, index) => {
        if (m.name) formData.append(`materials[${index}][name]`, m.name);
        formData.append(`materials[${index}][type]`, m.type);
        // Only allow link materials, skip file-based materials
        if (m.type === "link" && m.url) {
          formData.append(`materials[${index}][url]`, m.url);
        }
        // File materials are disabled:
        // } else if ((m.type === "pdf" || m.type === "doc") && m.file) {
        //   formData.append(`materials[${index}][${m.type}]`, m.file);
        // }
      });
    }

    const response = await axiosInstance.post<LessonResponse>(
      `instructor/course-management/courses/${courseId}/lessons`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage =
      axiosError.response?.data?.message || "Failed to create lesson";
    throw new Error(errorMessage);
  }
}

// Update lesson (partial)
export async function updateLesson(
  courseId: string,
  lessonId: string | number,
  lessonData: UpdateLessonInput
) {
  try {
    // Try JSON first - this is more standard for PUT requests
    const response = await axiosInstance.put<LessonResponse>(
      `instructor/course-management/courses/${courseId}/lessons/${lessonId}`,
      lessonData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage =
      axiosError.response?.data?.message || "Failed to update lesson";
    throw new Error(errorMessage);
  }
}

// Delete lesson
export async function deleteLesson(
  courseId: string,
  lessonId: string | number
) {
  try {
    const response = await axiosInstance.delete<LessonResponse>(
      `instructor/course-management/courses/${courseId}/lessons/${lessonId}`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage =
      axiosError.response?.data?.message || "Failed to delete lesson";
    throw new Error(errorMessage);
  }
}

// Upload a material file for a lesson
export async function uploadLessonMaterial(
  courseId: string,
  lessonId: string | number,
  params: { material: File; name: string }
) {
  try {
    const formData = new FormData();
    formData.append("material", params.material);
    formData.append("name", params.name);

    const response = await axiosInstance.post<LessonResponse>(
      `instructor/course-management/courses/${courseId}/lessons/${lessonId}/materials`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage =
      axiosError.response?.data?.message || "Failed to upload material";
    throw new Error(errorMessage);
  }
}
