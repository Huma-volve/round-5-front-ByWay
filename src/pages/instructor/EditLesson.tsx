import Breadcrumb from "@/components/common/Breadcrumb";
import AddLessonsForm from "@/components/instructor/addCourse/AddLessonsForm";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { useParams } from "react-router-dom";
import { useLesson } from "@/hooks/useCourseData";
import { useTranslation } from "react-i18next";

export default function EditLesson() {
  const { getAutoBreadcrumb } = useBreadcrumb();
  const { t } = useTranslation();
  const { courseId, lessonId } = useParams<{
    courseId: string;
    lessonId: string;
  }>();
  const { lesson, loading } = useLesson(lessonId);

  if (loading) {
    return (
      <div className="w-full bg-[var(--secondary-background)]">
        <div className="container py-3">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading lesson data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[var(--secondary-background)]">
      <div className="container py-3">
        <div className="flex md:gap-52 items-center flex-col gap-4 md:flex-row mb-20">
          <Breadcrumb items={getAutoBreadcrumb()} />
          <h1 className="text-3xl font-bold">
            {t("instructor.lessons.editLesson")}
          </h1>
        </div>
        <AddLessonsForm
          editMode={true}
          courseId={courseId}
          existingLesson={lesson || undefined}
        />
      </div>
    </div>
  );
}
