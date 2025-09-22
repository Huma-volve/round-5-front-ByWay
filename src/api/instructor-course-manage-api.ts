import axiosInstance from "@/lib/axios-instance";
import type { createCourseData, updateCourseData } from "@/lib/types";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export async function getCourseById(courseId: string | undefined) {
  try {
    const response = await axiosInstance.get(
      `instructor/course-management/courses/${courseId}`
    );
    // if (response.data?.success === true) {
    //   console.log(response.data);
    //   toast.success(response.data.message || "Course loaded successfully");
    // }
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage =
      axiosError.response?.data?.message || "Failed to fetch course";
    toast.error(errorMessage);
    throw error;
  }
}

export async function addNewCourse(courseData: createCourseData) {
  try {
    // Create FormData to handle file uploads
    const formData = new FormData();

    // Append text fields
    formData.append("title", courseData.title);
    formData.append("category_id", courseData.category_id.toString());
    formData.append("description", courseData.description);
    formData.append("price", courseData.price.toString());

    // Append files if they exist
    if (courseData.image) {
      formData.append("image", courseData.image);
    }
    if (courseData.video) {
      formData.append("video", courseData.video);
    }

    const response = await axiosInstance.post(
      "instructor/course-management/courses",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data?.status === 200) {
      console.log(response.data);
      toast.success(response.data.message || "Course created successfully");
    }
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage =
      axiosError.response?.data?.message || "Failed to create course";
    toast.error(errorMessage);
    throw error;
  }
}

export async function updateCourse(
  courseId: string,
  courseData: updateCourseData
) {
  try {
    const response = await axiosInstance.put(
      `instructor/course-management/courses/${courseId}`,
      courseData
    );

    if (response.data?.status === 200) {
      console.log(response.data);
      toast.success(response.data.message || "Course updated successfully");
    }
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage =
      axiosError.response?.data?.message || "Failed to update course";
    toast.error(errorMessage);
    throw error;
  }
}

export async function deleteCourse(courseId: string | undefined) {
  try {
    const response = await axiosInstance.delete(
      `instructor/course-management/courses/${courseId}`
    );

    if (response.data?.status === 200) {
      console.log(response.data);
      toast.success(response.data.message || "Course deleted successfully");
    }
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage =
      axiosError.response?.data?.message || "Failed to delete course";
    toast.error(errorMessage);
    throw error;
  }
}

export async function getCategoriesForCourse() {
  try {
    const response = await axiosInstance.get("categories-for-platform");
    // if (response.data?.status === 200) {
    //   console.log(response.data);
    //   toast.success(response.data.message || "Categories loaded successfully");
    // }
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage =
      axiosError.response?.data?.message || "Failed to fetch categories";
    toast.error(errorMessage);
    throw error;
  }
}
