import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import FormField from "@/components/ui/FormField";
import type { CourseData } from "@/data/addCourseData";
import { courseLevels } from "@/data/addCourseData";
import { courseValidationSchema } from "@/utils/courseSchema";
import VideoUploadField from "./VideoUploadField";
import ImageUploadField from "./ImageUploadField";
import { useTranslation } from "react-i18next";

export default function AddCourseForm() {
  const navigate = useNavigate();
  const {t} = useTranslation();

  const formik = useFormik<CourseData>({
    initialValues: {
      courseTitle: "",
      courseCategory: "",
      courseLevel: [],
      courseDescription: "",
      videoTitle: "Intro Video",
      coursePrice: 0,
      courseThumbnail: null,
      introVideo: null,
    },
    validationSchema: courseValidationSchema,
    onSubmit: (values) => {
      // handle form submission here
      console.log("Form submitted:", values);
      // Simulate course creation and get courseId
      const courseId = "course-" + Date.now(); // In real app, this would come from API response
      // Navigate to course management page with the new courseId
      navigate(`/instructor/courses/${courseId}/manage`);
    },
  });

  const handleLevelChange = (levelId: string, checked: boolean) => {
    const currentLevels = formik.values.courseLevel;
    if (checked) {
      formik.setFieldValue("courseLevel", [...currentLevels, levelId]);
    } else {
      formik.setFieldValue(
        "courseLevel",
        currentLevels.filter((id) => id !== levelId)
      );
    }
  };

  return (
    <div className="w-full">
      <div className="md:w-[80%]">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Course Title */}
          <FormField
            id="courseTitle"
            name="courseTitle"
            label={t("instructor.addCourse.courseTitle")}
            placeholder={t("instructor.addCourse.courseTitlePlaceholder")}
            value={formik.values.courseTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.courseTitle}
            touched={formik.touched.courseTitle}
            className="bg-white"
          />

          {/* Course Category */}
          <FormField
            id="courseCategory"
            name="courseCategory"
            label={t("instructor.addCourse.courseCategory")}
            placeholder={t("instructor.addCourse.courseCategoryPlaceholder")}
            value={formik.values.courseCategory}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.courseCategory}
            touched={formik.touched.courseCategory}
          />

          {/* Course Level */}
          <div className="space-y-3">
            <Label className="text-base">{t("instructor.addCourse.courseLevel.title")}</Label>
            <div className="flex flex-col gap-3 bg-white w-fit p-4 rounded-lg shadow-sm">
              {courseLevels.map((level) => (
                <div key={level.id} className="flex items-center space-x-2 ">
                  <Label
                    htmlFor={level.id}
                    className="text-base font-medium w-[100px]"
                  >
                    {level.label}
                  </Label>
                  <Checkbox
                    id={level.id}
                    checked={formik.values.courseLevel.includes(level.id)}
                    onCheckedChange={(checked: boolean) =>
                      handleLevelChange(level.id, checked)
                    }
                  />
                </div>
              ))}
            </div>
            {formik.touched.courseLevel && formik.errors.courseLevel && (
              <p className="text-sm text-red-500">
                {formik.errors.courseLevel}
              </p>
            )}
          </div>

          {/* Course Description */}
          <FormField
            id="courseDescription"
            name="courseDescription"
            label={t("instructor.addCourse.courseDescription")}
            type="textarea"
            placeholder={t("instructor.addCourse.courseDescriptionPlaceholder")}
            value={formik.values.courseDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.courseDescription}
            touched={formik.touched.courseDescription}
            rows={4}
          />

          {/* Video Title */}
          <FormField
            id="videoTitle"
            name="videoTitle"
            label={t("instructor.addCourse.videoTitle")}
            value={formik.values.videoTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.videoTitle}
            touched={formik.touched.videoTitle}
          />

          {/* Course Price */}
          <FormField
            id="coursePrice"
            name="coursePrice"
            label={t("instructor.addCourse.coursePrice")+ " ($)"}
            type="number"
            placeholder="0.00"
            value={formik.values.coursePrice || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.coursePrice}
            touched={formik.touched.coursePrice}
            min="0"
            step="0.01"
          />

          {/* Course Thumbnail */}
          <div className="space-y-2">
            <Label className="text-base">{t("instructor.addCourse.courseThumbnail")}</Label>
            <ImageUploadField
              value={formik.values.courseThumbnail || undefined}
              onChange={(file) => formik.setFieldValue("courseThumbnail", file)}
              error={
                formik.touched.courseThumbnail && formik.errors.courseThumbnail
                  ? String(formik.errors.courseThumbnail)
                  : undefined
              }
            />
          </div>

          {/* Intro Video Upload */}
          <div className="space-y-2">
            <Label className="text-base">{t("instructor.addCourse.introVideo")}</Label>
            <VideoUploadField
              value={formik.values.introVideo || undefined}
              onChange={(file) => formik.setFieldValue("introVideo", file)}
              error={
                formik.touched.introVideo && formik.errors.introVideo
                  ? String(formik.errors.introVideo)
                  : undefined
              }
            />
          </div>

          {/* Submit Button */}
          <div className="pt-6 px-6">
            <Button
              type="submit"
              className="w-full text-primary hover:text-white bg-white hover:bg-primary"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting
                ? "Creating Course..."
                : t("instructor.addCourse.submitButton")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
