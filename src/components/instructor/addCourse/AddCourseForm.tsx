import { useFormik } from "formik";
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
// import { categories } from "@/data/BrowseCourses";
import { createCourseValidationSchema } from "@/utils/courseSchema";
import VideoUploadField from "./VideoUploadField";
import ImageUploadField from "./ImageUploadField";
import { useTranslation } from "react-i18next";
import type { createCourseData } from "@/lib/types";
import useAddNewCourse from "@/hooks/instructor/useAddNewCourse";
import useGetCategories from "@/hooks/instructor/useGetCategories";

export default function AddCourseForm() {
  const { mutate, isPending } = useAddNewCourse();
  const { data, isLoading } = useGetCategories();
  const categories = data?.data || [];
  const { t } = useTranslation();

  const formik = useFormik<createCourseData>({
    initialValues: {
      title: "",
      category_id: 0,
      description: "",
      price: 0,
      image: null,
      video: null,
    },
    validationSchema: createCourseValidationSchema(t),
    onSubmit: (values) => {
      // handle form submission here
      console.log("Form submitted:", values);
      mutate(values);
      // Simulate course creation and get courseId
      // const courseId = "course-" + Date.now(); // In real app, this would come from API response
      // Navigate to course management page with the new courseId
      // navigate(`/instructor/my-courses/${courseId}/manage`);
    },
  });

  return (
    <div className="w-full">
      <div className="md:w-[80%]">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Course Title */}
          <FormField
            id="courseTitle"
            name="title"
            label={t("instructor.addCourse.courseTitle")}
            placeholder={t("instructor.addCourse.courseTitlePlaceholder")}
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.title}
            touched={formik.touched.title}
            className="bg-white"
          />

          {/* Course Category */}
          <div className="space-y-2">
            <Label htmlFor="courseCategory" className="text-base">
              {t("instructor.addCourse.courseCategory")}
            </Label>
            {isLoading ? (
              <p className="text-gray-500 animate-pulse ps-1">Loading categories...</p>
            ) : (
              <Select
                value={
                  formik.values.category_id === 0
                    ? "0"
                    : formik.values.category_id.toString()
                }
                onValueChange={(value) =>
                  formik.setFieldValue("category_id", parseInt(value))
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
                  {categories.map((category: { id: number; name: string }) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {formik.touched.category_id && formik.errors.category_id && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.category_id}
              </p>
            )}
          </div>

          {/* Course Description */}
          <FormField
            id="courseDescription"
            name="description"
            label={t("instructor.addCourse.courseDescription")}
            type="textarea"
            placeholder={t("instructor.addCourse.courseDescriptionPlaceholder")}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.description}
            touched={formik.touched.description}
            rows={4}
          />

          {/* Course Price */}
          <FormField
            id="coursePrice"
            name="price"
            label={t("instructor.addCourse.coursePrice") + " ($)"}
            type="number"
            placeholder="0.00"
            value={formik.values.price || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.price}
            touched={formik.touched.price}
            min="0"
            step="0.01"
          />

          {/* Course Thumbnail */}
          <div className="space-y-2">
            <Label className="text-base">
              {t("instructor.addCourse.courseThumbnail")}
            </Label>
            <ImageUploadField
              value={formik.values.image || undefined}
              onChange={(file) => formik.setFieldValue("image", file)}
              error={
                formik.touched.image && formik.errors.image
                  ? String(formik.errors.image)
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
              value={formik.values.video || undefined}
              onChange={(file) => formik.setFieldValue("video", file)}
              error={
                formik.touched.video && formik.errors.video
                  ? String(formik.errors.video)
                  : undefined
              }
            />
          </div>

          {/* Submit Button */}
          <div className="pt-6 px-6">
            <Button
              type="submit"
              className="w-full text-primary hover:text-white bg-white hover:bg-primary"
              disabled={isPending}
            >
              {isPending
                ? "Creating Course..."
                : t("instructor.addCourse.submitButton")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
