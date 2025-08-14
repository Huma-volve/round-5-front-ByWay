import * as yup from "yup";

export const courseValidationSchema = yup.object({
  courseTitle: yup
    .string()
    .required("Course title is required")
    .min(3, "Course title must be at least 3 characters")
    .max(100, "Course title must be less than 100 characters"),

  courseCategory: yup.string().required("Course category is required"),

  courseLevel: yup
    .array()
    .of(yup.string())
    .min(1, "At least one course level must be selected")
    .required("Course level is required"),

  courseDescription: yup
    .string()
    .required("Course description is required")
    .min(10, "Course description must be at least 10 characters")
    .max(1000, "Course description must be less than 1000 characters"),

  videoTitle: yup
    .string()
    .required("Video title is required")
    .min(3, "Video title must be at least 3 characters")
    .max(100, "Video title must be less than 100 characters"),

  coursePrice: yup
    .number()
    .required("Course price is required")
    .positive("Course price must be a positive number")
    .max(9999, "Course price must be less than $9999"),

  courseThumbnail: yup
    .mixed()
    .required("Course thumbnail is required")
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value) return false;
      if (value instanceof File) {
        return value.type.startsWith("image/");
      }
      return true;
    })
    .test("fileSize", "File size must be less than 5MB", (value) => {
      if (!value) return false;
      if (value instanceof File) {
        return value.size <= 5 * 1024 * 1024;
      }
      return true;
    }),

  introVideo: yup
    .mixed()
    .required("Intro video is required")
    .test("fileType", "Only video files are allowed", (value) => {
      if (!value) return false;
      if (value instanceof File) {
        return value.type.startsWith("video/");
      }
      return true;
    })
    .test("fileSize", "File size must be less than 100MB", (value) => {
      if (!value) return false;
      if (value instanceof File) {
        return value.size <= 100 * 1024 * 1024;
      }
      return true;
    }),
});
