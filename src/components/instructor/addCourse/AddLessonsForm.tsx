import { useFormik, FieldArray, FormikProvider } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import FormField from "@/components/ui/FormField";
import VideoUploadField from "./VideoUploadField";
import MaterialsUploadField from "./MaterialsUploadField";
import type {
  AddLessonsData,
  LessonData,
  LessonMaterialInput,
} from "@/data/addLessonsData";
import { createAddLessonsValidationSchema } from "@/schemas/lessonsSchema";
import useCreateLesson from "@/hooks/instructor/useCreateLesson";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface AddLessonsFormProps {
  courseId?: string;
}

export default function AddLessonsForm({
  courseId: propCourseId,
}: AddLessonsFormProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { courseId: paramCourseId } = useParams<{
    courseId: string;
  }>();

  // Use courseId from props or params
  const courseId = propCourseId || paramCourseId;

  const { mutateAsync: createLessonMutate, isPending: isCreating } =
    useCreateLesson(courseId || "");

  const initialLesson = useMemo<LessonData>(
    () => ({
      lessonTitle: "",
      lessonDescription: "",
      lessonDuration: 0,
      lessonVideo: null,
      lessonMaterials: null,
    }),
    []
  );

  const initialValues = useMemo<AddLessonsData>(
    () => ({
      courseId: courseId || "",
      lessons: [initialLesson],
    }),
    [courseId, initialLesson]
  );

  const formik = useFormik<AddLessonsData>({
    initialValues,
    validationSchema: createAddLessonsValidationSchema(t),
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!courseId) return;

      for (const l of values.lessons) {
        const validMaterials = (l.materials || [])
          .filter((m: LessonMaterialInput) => {
            if (!m || !m.type) return false;
            if (m.type === "link") return Boolean(m.name && m.url);
            return Boolean(m.name && m.file);
          })
          .map((m: LessonMaterialInput) => ({
            name: m.name,
            type: m.type,
            url: m.type === "link" ? m.url : undefined,
            file: m.type !== "link" ? m.file || null : undefined,
          }));

        await createLessonMutate({
          title: l.lessonTitle,
          description: l.lessonDescription,
          video: l.lessonVideo,
          video_duration: Number(l.lessonDuration) * 60,
          materials: validMaterials,
        });
      }
      navigate(`/instructor/my-courses/${courseId}/lessons`);
    },
  });

  // Removed useEffect that was calling setValues on every render to avoid update depth loops

  const addNewLesson = () => {
    const newLessons = [...formik.values.lessons, { ...initialLesson }];
    formik.setFieldValue("lessons", newLessons);
  };

  const removeLesson = (index: number) => {
    if (formik.values.lessons.length > 1) {
      const newLessons = formik.values.lessons.filter((_, i) => i !== index);
      formik.setFieldValue("lessons", newLessons);
    }
  };

  const getFieldError = (fieldPath: string) => {
    const pathArray = fieldPath.split(".");
    let error: unknown = formik.errors;
    let touched: unknown = formik.touched;

    for (const path of pathArray) {
      error = (error as Record<string, unknown>)?.[path];
      touched = (touched as Record<string, unknown>)?.[path];
    }

    return touched && error ? String(error) : undefined;
  };

  const getFieldTouched = (fieldPath: string) => {
    const pathArray = fieldPath.split(".");
    let touched: unknown = formik.touched;

    for (const path of pathArray) {
      touched = (touched as Record<string, unknown>)?.[path];
    }

    return Boolean(touched);
  };

  // Check if all required fields in the last lesson are filled
  const isLastLessonComplete = () => {
    const lastLessonIndex = formik.values.lessons.length - 1;
    const lastLesson = formik.values.lessons[lastLessonIndex];

    if (!lastLesson) return false;

    return (
      lastLesson.lessonTitle.trim() !== "" &&
      lastLesson.lessonDescription.trim() !== "" &&
      lastLesson.lessonDuration > 0 &&
      lastLesson.lessonVideo !== null
    );
  };

  return (
    <FormikProvider value={formik}>
      <div className="w-full">
        <div className="md:w-[80%]">
          <form onSubmit={formik.handleSubmit} className="space-y-8">
            <FieldArray name="lessons">
              {() => (
                <div className="space-y-6">
                  {formik.values.lessons.map((lesson, index) => (
                    <Card
                      key={index}
                      className="relative shadow-none border-none"
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            {t("instructor.lessons.title")}
                          </CardTitle>
                          {formik.values.lessons.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeLesson(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        {/* Lesson Title */}
                        <FormField
                          id={`lessons.${index}.lessonTitle`}
                          name={`lessons.${index}.lessonTitle`}
                          label={t("instructor.lessons.lessonTitle")}
                          placeholder={t(
                            "instructor.lessons.lessonTitlePlaceholder"
                          )}
                          value={lesson.lessonTitle}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={getFieldError(`lessons.${index}.lessonTitle`)}
                          touched={getFieldTouched(
                            `lessons.${index}.lessonTitle`
                          )}
                        />

                        {/* Lesson Description */}
                        <FormField
                          id={`lessons.${index}.lessonDescription`}
                          name={`lessons.${index}.lessonDescription`}
                          label={t("instructor.lessons.lessonDescription")}
                          placeholder={t(
                            "instructor.lessons.lessonDescriptionPlaceholder"
                          )}
                          value={lesson.lessonDescription}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={getFieldError(
                            `lessons.${index}.lessonDescription`
                          )}
                          touched={getFieldTouched(
                            `lessons.${index}.lessonDescription`
                          )}
                        />

                        {/* Lesson Duration */}
                        <FormField
                          id={`lessons.${index}.lessonDuration`}
                          name={`lessons.${index}.lessonDuration`}
                          label={t("instructor.lessons.lessonDuration")}
                          placeholder={t(
                            "instructor.lessons.lessonDurationPlaceholder"
                          )}
                          type="number"
                          value={lesson.lessonDuration.toString()}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={getFieldError(
                            `lessons.${index}.lessonDuration`
                          )}
                          touched={getFieldTouched(
                            `lessons.${index}.lessonDuration`
                          )}
                        />

                        {/* Lesson Video */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {t("instructor.lessons.lessonVideo")}
                          </label>
                          <VideoUploadField
                            value={lesson.lessonVideo || undefined}
                            onChange={(file) =>
                              formik.setFieldValue(
                                `lessons.${index}.lessonVideo`,
                                file
                              )
                            }
                            error={getFieldError(
                              `lessons.${index}.lessonVideo`
                            )}
                          />
                        </div>

                        {/* Lesson Materials */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {t("instructor.lessons.lessonMaterials")}
                          </label>
                          <MaterialsUploadField
                            value={
                              (lesson.materials as
                                | LessonMaterialInput[]
                                | undefined) || []
                            }
                            onChange={(materials) =>
                              formik.setFieldValue(
                                `lessons.${index}.materials`,
                                materials
                              )
                            }
                            error={getFieldError(`lessons.${index}.materials`)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Add Another Lesson Button */}
                  <div className="flex justify-center pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addNewLesson}
                      disabled={!isLastLessonComplete()}
                      className="w-full max-w-md bg-white hover:shadow-md hover:bg-gray-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {t("instructor.lessons.addAnotherLesson")}
                    </Button>
                  </div>
                </div>
              )}
            </FieldArray>

            {/* Submit Button */}
            <div className="pt-6 px-6">
              <Button
                type="submit"
                className="w-full text-primary hover:text-white bg-white hover:bg-primary"
                disabled={formik.isSubmitting || isCreating}
              >
                {formik.isSubmitting || isCreating
                  ? t("instructor.lessons.uploadingLessons")
                  : t("instructor.lessons.saveLessons")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </FormikProvider>
  );
}
