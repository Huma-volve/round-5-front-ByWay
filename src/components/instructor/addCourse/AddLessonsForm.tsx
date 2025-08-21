import { useFormik, FieldArray, FormikProvider } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import FormField from "@/components/ui/FormField";
import VideoUploadField from "./VideoUploadField";
import MaterialsUploadField from "./MaterialsUploadField";
import type { AddLessonsData, LessonData } from "@/data/addLessonsData";
import type { Lesson } from "@/data/coursesData";
import { createAddLessonsValidationSchema } from "@/schemas/lessonsSchema";
import { useLesson } from "@/hooks/useCourseData";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface AddLessonsFormProps {
  editMode?: boolean;
  courseId?: string;
  existingLesson?: Lesson;
}

export default function AddLessonsForm({
  editMode = false,
  courseId: propCourseId,
  existingLesson,
}: AddLessonsFormProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { courseId: paramCourseId, lessonId } = useParams<{
    courseId: string;
    lessonId: string;
  }>();

  // Use courseId from props or params
  const courseId = propCourseId || paramCourseId;

  // Fetch lesson data if in edit mode and lessonId is provided
  const { lesson: fetchedLesson } = useLesson(
    editMode && lessonId ? lessonId : undefined
  );

  // Determine the lesson to use (prop or fetched)
  const lessonToEdit =
    existingLesson || (editMode && lessonId ? fetchedLesson : null);

  const initialLesson: LessonData = {
    lessonTitle: "",
    lessonDescription: "",
    lessonDuration: 0,
    lessonVideo: null,
    lessonMaterials: null,
  };

  // Convert lesson data for editing (note: files will need to be re-uploaded)
  const convertLessonForEdit = (lesson: Lesson): LessonData => ({
    lessonTitle: lesson.title,
    lessonDescription: lesson.description,
    lessonDuration: lesson.duration,
    lessonVideo: null, // User will need to re-upload video
    lessonMaterials: null, // User will need to re-upload materials
  });

  const formik = useFormik<AddLessonsData>({
    initialValues: {
      courseId: courseId || "",
      lessons:
        editMode && lessonToEdit
          ? [convertLessonForEdit(lessonToEdit)]
          : [initialLesson],
    },
    validationSchema: createAddLessonsValidationSchema(t),
    enableReinitialize: true, // This allows form to reinitialize when lessonToEdit changes
    onSubmit: (values) => {
      console.log("Lessons submitted:", values);
      if (editMode) {
        // Handle lesson update
        console.log("Updating lesson:", values);
        // Navigate back to lessons view
        navigate(`/instructor/my-courses/${courseId}/lessons`);
      } else {
        // Handle lesson creation
        console.log("Creating lessons:", values);
        // Navigate back to course selection or dashboard
        navigate(`/instructor/my-courses/${courseId}/manage`);
      }
    },
  });

  // Update form values when lesson data is loaded
  useEffect(() => {
    if (editMode && lessonToEdit) {
      formik.setValues({
        courseId: courseId || "",
        lessons: [convertLessonForEdit(lessonToEdit)],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonToEdit, editMode, courseId]);

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
          {/* Header with back button for edit mode */}
          {editMode && (
            <div className="mb-6">
              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  navigate(`/instructor/my-courses${courseId}/lessons`)
                }
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2 rtl:rotate-180" />
                {t("instructor.lessons.backToLessons")}
              </Button>
              <h1 className="text-2xl font-bold ml-3 rtl:mr-3">
                {t("instructor.lessons.editLesson")}
              </h1>
              <p className="text-muted-foreground ml-3 rtl:mr-3">
                {t("instructor.lessons.updateLessonDescription")}
              </p>
            </div>
          )}

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
                            {editMode
                              ? t("instructor.lessons.editLesson")
                              : t("instructor.lessons.title")}
                          </CardTitle>
                          {!editMode && formik.values.lessons.length > 1 && (
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
                            value={lesson.lessonMaterials}
                            onChange={(files) =>
                              formik.setFieldValue(
                                `lessons.${index}.lessonMaterials`,
                                files
                              )
                            }
                            error={getFieldError(
                              `lessons.${index}.lessonMaterials`
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Add Another Lesson Button - Only show when not in edit mode */}
                  {!editMode && (
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
                  )}
                </div>
              )}
            </FieldArray>

            {/* Submit Button */}
            <div className="pt-6 px-6">
              <Button
                type="submit"
                className="w-full text-primary hover:text-white bg-white hover:bg-primary"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting
                  ? editMode
                    ? t("instructor.lessons.updatingLesson")
                    : t("instructor.lessons.uploadingLessons")
                  : editMode
                  ? t("instructor.lessons.updateLesson")
                  : t("instructor.lessons.saveLessons")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </FormikProvider>
  );
}
