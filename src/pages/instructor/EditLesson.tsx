// import Breadcrumb from "@/components/common/Breadcrumb";
import UpdateLessonForm from "@/components/instructor/updateLesson/UpdateLessonForm";
// import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import NewBreadCrumb from "@/components/common/NewBreadCrumb";
import { useParams } from "react-router-dom";

export default function EditLesson() {
  // const { getAutoBreadcrumb } = useBreadcrumb();
  const { t } = useTranslation();
  const { courseId } = useParams<{ courseId: string }>();
  const breadcrumbItems = useMemo(
    () => [
      { label: "common.home", link: "/" },
      {
        label: "instructor.courseManagement.title",
        link: `/instructor/my-courses/${courseId}/manage`,
      },
      {
        label: "instructor.lessons.title",
        link: `/instructor/my-courses/${courseId}/lessons`,
      },
      { label: "instructor.lessons.editLesson" },
    ],
    [courseId]
  );

  return (
    <div className="rounded-lg w-full bg-[var(--secondary-background)]">
      <div className="container py-3 mt-6">
        <div className="flex">
          {/* <Breadcrumb items={getAutoBreadcrumb()} /> */}
          <NewBreadCrumb items={breadcrumbItems} />
        </div>
        <h1 className="text-3xl font-bold text-center mt-1">
          {t("instructor.lessons.editLesson")}
        </h1>
        <UpdateLessonForm />
      </div>
    </div>
  );
}
