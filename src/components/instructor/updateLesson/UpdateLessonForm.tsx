import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import FormField from "@/components/ui/FormField";
import { useTranslation } from "react-i18next";
import type { UpdateLessonData } from "@/lib/types";
import useFetchLessonById from "@/hooks/instructor/useFetchLessonById";
import useUpdateLesson from "@/hooks/instructor/useUpdateLesson";
import { useMemo } from "react";
import UpdateLessonSkeleton from "./UpdateLessonSkeleton";
import { createUpdateLessonValidationSchema } from "@/schemas/lessonsSchema";

export default function UpdateLessonForm() {
  const { courseId, lessonId } = useParams<{
    courseId: string;
    lessonId: string;
  }>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Fetch lesson data
  const {
    data: fetchedLessonResp,
    isLoading: isLessonLoading,
    isError: isLessonError,
    error: lessonError,
  } = useFetchLessonById(courseId, lessonId);

  const { mutate: updateLessonMutate, isPending: isUpdating } = useUpdateLesson(
    courseId || "",
    lessonId || ""
  );

  const lessonData = useMemo(() => {
    if (!fetchedLessonResp?.data) return null;
    const d = fetchedLessonResp.data;
    return {
      title: d.title,
      description: d.description,
      order: d.order,
    };
  }, [fetchedLessonResp?.data]);

  const formik = useFormik<UpdateLessonData>({
    initialValues: {
      title: lessonData?.title || "",
      description: lessonData?.description || "",
      order: (lessonData?.order ?? 0) + 1,
    },
    enableReinitialize: true,
    validationSchema: createUpdateLessonValidationSchema(t),
    onSubmit: (values) => {
      if (!courseId || !lessonId) return;

      updateLessonMutate({
        title: values.title,
        description: values.description,
        order: values.order,
      });

      navigate(`/instructor/my-courses/${courseId}/lessons`);
    },
  });

  // Loading state
  if (isLessonLoading) {
    return <UpdateLessonSkeleton />;
  }

  // Error state
  if (isLessonError) {
    return (
      <div className="w-full">
        <div className="md:w-[80%]">
          <div className="mb-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                navigate(`/instructor/my-courses/${courseId}/lessons`)
              }
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2 rtl:rotate-180" />
              {t("instructor.lessons.backToLessons")}
            </Button>
          </div>
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">
              {lessonError?.message || "Failed to load lesson"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main form
  return (
    <div className="w-full pb-10 ">
      <div className="md:w-[80%]">
        {/* Header */}
        <div className="mb-6">
          {/* <Button
            type="button"
            variant="ghost"
            onClick={() =>
              navigate(`/instructor/my-courses/${courseId}/lessons`)
            }
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2 rtl:rotate-180" />
            {t("instructor.lessons.backToLessons")}
          </Button> */}
          {/* <h1 className="text-2xl font-bold ml-3 rtl:mr-3">
            {t("instructor.lessons.editLesson")}
          </h1> */}
          {/* <p className="text-muted-foreground ml-3 rtl:mr-3">
            {t("instructor.lessons.updateLessonDescription")}
          </p> */}
        </div>

        {/* Form */}
        {lessonData && (
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Lesson Title */}
            <FormField
              id="title"
              name="title"
              label={t("instructor.lessons.lessonTitle")}
              placeholder={t("instructor.lessons.lessonTitlePlaceholder")}
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.title}
              touched={formik.touched.title}
              className="bg-white"
            />

            {/* Lesson Description */}
            <FormField
              id="description"
              name="description"
              label={t("instructor.lessons.lessonDescription")}
              placeholder={t("instructor.lessons.lessonDescriptionPlaceholder")}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.description}
              touched={formik.touched.description}
              className="bg-white"
              rows={4}
            />

            {/* Lesson Order */}
            <FormField
              id="order"
              name="order"
              label={t("instructor.lessons.lessonOrder")}
              placeholder={t("instructor.lessons.lessonOrderPlaceholder")}
              type="number"
              value={formik.values.order.toString()}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.order}
              touched={formik.touched.order}
              className="bg-white"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full text-primary hover:text-white bg-white hover:bg-primary"
              disabled={formik.isSubmitting || isUpdating}
            >
              {formik.isSubmitting || isUpdating
                ? t("instructor.lessons.updatingLesson")
                : t("instructor.lessons.updateLesson")}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
