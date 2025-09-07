// import Breadcrumb from "@/components/common/Breadcrumb";
import AddLessonsForm from "@/components/instructor/addCourse/AddLessonsForm";
// import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import NewBreadCrumb from "@/components/common/NewBreadCrumb";
import { useParams } from "react-router-dom";

export default function AddLessons() {
  // const { getAutoBreadcrumb } = useBreadcrumb();
  const { t } = useTranslation();
    const { courseId } = useParams<{ courseId: string }>();  
  const breadcrumbItems = useMemo(() => [
    { label: "common.home", link: "/" },
    { label: "instructor.courseManagement.title" , link: `/instructor/my-courses/${courseId}/manage`},
    { label: "instructor.lessons.title" , link: `/instructor/my-courses/${courseId}/lessons`},
    { label: "instructor.lessons.addLessons" },
  ], [courseId]);

  return (
    <div className="w-full min-h-screen bg-[var(--secondary-background)]">
      <div className="container py-3">
        <div className="flex md:gap-52 items-center flex-col gap-4 md:flex-row mb-10">
          {/* <Breadcrumb items={getAutoBreadcrumb()} /> */}
          <NewBreadCrumb items={breadcrumbItems} />
        </div>
          <h1 className="text-3xl font-bold mb-20 text-center">{t("instructor.lessons.addLessons")}</h1>
        <AddLessonsForm />
      </div>
    </div>
  );
}
