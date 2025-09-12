import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FormField from "@/components/ui/FormField";
import { updateCourseValidationSchema } from "@/utils/courseSchema";
import { useTranslation } from "react-i18next";
import type { updateCourseData } from "@/lib/types";
import useUpdateCourse from "@/hooks/instructor/useUpdateCourse";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import useFetchCourseById from "@/hooks/instructor/useFetchCourseById";
import UpdateCourseSkeleton from "./UpdateCourseSkeleton";
import useGetCategories from "@/hooks/instructor/useGetCategories";

export default function UpdateCourseForm() {
  const { courseId } = useParams<{ courseId: string }>();
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: catData } = useGetCategories();
  const categories = useMemo(() => catData?.data || [], [catData]);
  const { data, isLoading, isError, error } = useFetchCourseById(
    courseId || ""
  );
  const { mutate, isPending } = useUpdateCourse(courseId || "");
  const courseData = useMemo(() => data?.data || {}, [data]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsDropdownOpen(false);
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);
  let content;
  if (isLoading) {
    content = <UpdateCourseSkeleton />;
  } else if (isError) {
    content = (
      <div className="">
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">
            {error?.message || "Failed to load top-rated courses"}
          </p>
        </div>
      </div>
    );
  }

  const formik = useFormik<updateCourseData>({
    initialValues: {
      title: courseData?.title ?? "",
      category_id: courseData?.category?.id,
      description: courseData?.description ?? "",
      price: courseData?.price ?? 0,
    },
    enableReinitialize: true,
    validationSchema: updateCourseValidationSchema(t),
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      mutate(values);
    },
  });

  return (
    <div className="w-full">
      <div className="md:w-[80%]">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Course Title */}
          {content}
          {courseData && !isLoading && !isError && categories && (
            <>
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
              {categories && (
                <div className="space-y-2 ">
                  <Label htmlFor="courseCategory" className="text-base">
                    {t("instructor.addCourse.courseCategory")}
                  </Label>
                  <div className="relative ">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsDropdownOpen(!isDropdownOpen);
                      }}
                      className=" flex h-10 w-full items-center justify-between rounded-md border border-input bg-white shadow-sm px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <span
                        className={
                          formik.values.category_id
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }
                      >
                        {formik.values.category_id
                          ? categories.find(
                              (cat: { id: number; name: string }) => cat.id === formik.values.category_id
                            )?.name
                          : t("instructor.addCourse.courseCategoryPlaceholder")}
                      </span>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </button>

                    {/* Custom Dropdown Options */}
                    {isDropdownOpen && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute z-50 w-full mt-1 bg-white border border-input rounded-md shadow-lg max-h-60 overflow-auto"
                      >
                        {categories.map((category: { id: number; name: string }) => (
                          <div
                            key={category.id}
                            onClick={() => {
                              console.log(
                                "Custom dropdown - Category selected:",
                                category.id,
                                "->",
                                category.name
                              );
                              formik.setFieldValue("category_id", category.id);
                              setIsDropdownOpen(false);
                            }}
                            className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 hover:rounded-md mx-1 my-0.5 rounded-sm transition-colors"
                          >
                            {category.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {formik.touched.category_id && formik.errors.category_id && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.category_id}
                    </p>
                  )}
                </div>
              )}

              {/* Course Description */}
              <FormField
                id="courseDescription"
                name="description"
                label={t("instructor.addCourse.courseDescription")}
                type="textarea"
                placeholder={t(
                  "instructor.addCourse.courseDescriptionPlaceholder"
                )}
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

              {/* Submit Button */}
              <div className="pt-6 px-6">
                <Button
                  type="submit"
                  className="w-full text-primary hover:text-white bg-white hover:bg-primary"
                  disabled={isPending}
                >
                  {isPending
                    ? "Updating Course..."
                    : t("instructor.updateCourse.submitButton")}
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
