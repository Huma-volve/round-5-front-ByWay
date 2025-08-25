import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FormField from "@/components/ui/FormField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CourseData } from "@/data/addCourseData";
import { categories } from "@/data/BrowseCourses";
import { createCourseValidationSchema } from "@/utils/courseSchema";
import VideoUploadField from "./VideoUploadField";
import ImageUploadField from "./ImageUploadField";
import { useTranslation } from "react-i18next";

export default function AddCourseForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formik = useFormik<CourseData>({
    initialValues: {
      courseTitle: "",
      courseCategory: 0,
      courseDescription: "",
      coursePrice: 0,
      courseThumbnail: null,
      introVideo: null,
    },
    validationSchema: createCourseValidationSchema(t),
    onSubmit: (values) => {
      // handle form submission here
      console.log("Form submitted:", values);
      // Simulate course creation and get courseId
      const courseId = "course-" + Date.now(); // In real app, this would come from API response
      // Navigate to course management page with the new courseId
      navigate(`/instructor/my-courses/${courseId}/manage`);
    },
  });

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
          <div className="space-y-2">
            <Label htmlFor="courseCategory" className="text-base">
              {t("instructor.addCourse.courseCategory")}
            </Label>
            <Select
              value={
                formik.values.courseCategory === 0
                  ? "0"
                  : formik.values.courseCategory.toString()
              }
              onValueChange={(value) =>
                formik.setFieldValue("courseCategory", parseInt(value))
              }
            >
              <SelectTrigger className="bg-white">
                <SelectValue
                  placeholder={t(
                    "instructor.addCourse.courseCategoryPlaceholder"
                  )}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0" disabled>
                  {t("instructor.addCourse.courseCategoryDefault")}
                </SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.courseCategory && formik.errors.courseCategory && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.courseCategory}
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

          {/* Course Price */}
          <FormField
            id="coursePrice"
            name="coursePrice"
            label={t("instructor.addCourse.coursePrice") + " ($)"}
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
            <Label className="text-base">
              {t("instructor.addCourse.courseThumbnail")}
            </Label>
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
            <Label className="text-base">
              {t("instructor.addCourse.introVideo")}
            </Label>
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
