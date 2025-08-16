import * as yup from "yup";

export const createCourseValidationSchema = (t: (key: string) => string) =>
  yup.object({
    courseTitle: yup
      .string()
      .required(t("validation.course.courseTitleRequired"))
      .min(3, t("validation.course.courseTitleMin"))
      .max(100, t("validation.course.courseTitleMax")),

    courseCategory: yup
      .string()
      .required(t("validation.course.courseCategoryRequired")),

    courseLevel: yup
      .array()
      .of(yup.string())
      .min(1, t("validation.course.courseLevelMin"))
      .required(t("validation.course.courseLevelRequired")),

    courseDescription: yup
      .string()
      .required(t("validation.course.courseDescriptionRequired"))
      .min(10, t("validation.course.courseDescriptionMin"))
      .max(1000, t("validation.course.courseDescriptionMax")),

    videoTitle: yup
      .string()
      .required(t("validation.course.videoTitleRequired"))
      .min(3, t("validation.course.videoTitleMin"))
      .max(100, t("validation.course.videoTitleMax")),

    coursePrice: yup
      .number()
      .required(t("validation.course.coursePriceRequired"))
      .positive(t("validation.course.coursePricePositive"))
      .max(9999, t("validation.course.coursePriceMax")),

    courseThumbnail: yup
      .mixed()
      .required(t("validation.course.courseThumbnailRequired"))
      .test(
        "fileType",
        t("validation.course.onlyImageFilesAllowed"),
        (value) => {
          if (!value) return false;
          if (value instanceof File) {
            return value.type.startsWith("image/");
          }
          return true;
        }
      )
      .test("fileSize", t("validation.course.imageSizeLimit"), (value) => {
        if (!value) return false;
        if (value instanceof File) {
          return value.size <= 5 * 1024 * 1024;
        }
        return true;
      }),

    introVideo: yup
      .mixed()
      .required(t("validation.course.introVideoRequired"))
      .test(
        "fileType",
        t("validation.course.onlyVideoFilesAllowed"),
        (value) => {
          if (!value) return false;
          if (value instanceof File) {
            return value.type.startsWith("video/");
          }
          return true;
        }
      )
      .test("fileSize", t("validation.course.videoSizeLimit"), (value) => {
        if (!value) return false;
        if (value instanceof File) {
          return value.size <= 100 * 1024 * 1024;
        }
        return true;
      }),
  });

// Keep the old export for backward compatibility, but it will use English messages
export const courseValidationSchema = createCourseValidationSchema(
  (key: string) => {
    // Fallback English messages for backward compatibility
    const messages: Record<string, string> = {
      "validation.course.courseTitleRequired": "Course title is required",
      "validation.course.courseTitleMin":
        "Course title must be at least 3 characters",
      "validation.course.courseTitleMax":
        "Course title must be less than 100 characters",
      // Add more fallbacks as needed...
    };
    return messages[key] || key;
  }
);
