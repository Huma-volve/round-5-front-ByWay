import { useTranslation } from "react-i18next";
import UpdateCourseForm from "@/components/instructor/updateCourse/UpdateCourseForm";

export default function UpdateCoursePage() {
  const { t } = useTranslation();

  // Mock data - in real app, you would fetch this from API
  return (
    <div className="container mx-auto px-4 py-8 bg-secondaryBackground">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("instructor.updateCourse.title")}
          </h1>
          <p className="text-gray-600">
            {t("instructor.updateCourse.description")}
          </p>
        </div>

        {/* Course Update Form */}
        <div className=" rounded-lg p-6">
          <UpdateCourseForm />
        </div>
      </div>
    </div>
  );
}
