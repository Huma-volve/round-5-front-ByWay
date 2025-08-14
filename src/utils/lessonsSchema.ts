import * as Yup from "yup";
import {
  supportedVideoFormats,
  supportedMaterialFormats,
} from "@/data/addLessonsData";

const lessonSchema = Yup.object().shape({
  lessonTitle: Yup.string()
    .min(3, "Lesson title must be at least 3 characters")
    .max(100, "Lesson title must be less than 100 characters")
    .required("Lesson title is required"),

  lessonDescription: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters")
    .required("Lesson description is required"),

  lessonDuration: Yup.number()
    .min(1, "Duration must be at least 1 minute")
    .max(180, "Duration must be less than 3 hours")
    .required("Lesson duration is required"),

  lessonVideo: Yup.mixed()
    .required("Lesson video is required")
    .test("fileSize", "Video file size must be less than 500MB", (value) => {
      if (!value || typeof value === "string") return true;
      const file = value as File;
      return file.size <= 500 * 1024 * 1024; // 500MB
    })
    .test("fileType", "Please upload a valid video file", (value) => {
      if (!value || typeof value === "string") return true;
      const file = value as File;
      return supportedVideoFormats.includes(file.type);
    }),

  lessonMaterials: Yup.array()
    .of(
      Yup.mixed()
        .test("fileSize", "File size must be less than 10MB", (value) => {
          if (!value) return true;
          const file = value as File;
          return file.size <= 10 * 1024 * 1024; // 10MB
        })
        .test("fileType", "Please upload valid material files", (value) => {
          if (!value) return true;
          const file = value as File;
          return supportedMaterialFormats.includes(file.type);
        })
    )
    .nullable(),

  isPreview: Yup.boolean(),
});

export const addLessonsValidationSchema = Yup.object().shape({
  courseId: Yup.string(),
  lessons: Yup.array()
    .of(lessonSchema)
    .min(1, "At least one lesson is required")
    .required("Lessons are required"),
});
