import { useTranslation } from "react-i18next";
import UpdateCourseForm from "@/components/instructor/updateCourse/UpdateCourseForm";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import NewBreadCrumb from "@/components/common/NewBreadCrumb";

export default function UpdateCoursePage() {
  const { t } = useTranslation();
  const { courseId } = useParams<{ courseId: string }>();
  const breadcrumbItems = useMemo(() => [
    { label: "common.home", link: "/" },
    { label: "instructor.courseManagement.title", link: `/instructor/my-courses/${courseId}/manage` },
    { label: "instructor.updateCourse.title" },
  ], [courseId]);

  // Mock data - in real app, you would fetch this from API
  return (
    <div className="container mx-auto px-4 py-8 bg-secondaryBackground rounded-lg">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <NewBreadCrumb items={breadcrumbItems} />
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("instructor.updateCourse.title")}
          </h1>
          <p className="text-gray-600">
            {t("instructor.updateCourse.description")}
          </p>
        </div>

        {/* Course Update Form */}
        <div className="  p-6">
          <UpdateCourseForm />
        </div>
      </div>
    </div>
  );
}
