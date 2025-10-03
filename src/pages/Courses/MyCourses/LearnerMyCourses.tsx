// LearnerMyCourses.jsx
import LearnerMyCourseCard from "@/components/learnerCourses/LearnerMyCourseCard";
import { Outlet, useParams } from "react-router-dom";
import { useMemo } from "react";
import NewBreadCrumb from "@/components/common/NewBreadCrumb";
import { useTranslation } from "react-i18next";

export default function LearnerMyCourses() {
  const breadcrumbItems = useMemo(
    () => [
      { label: "common.home", link: "/" },
      { label: "common.learnermycourse" },
    ],
    []
  );
  const { learnerCourseId } = useParams();
  const {t} = useTranslation();
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm py-4 mb-6">
        <div className="container mx-auto px-4">
          <NewBreadCrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {learnerCourseId ? (
          <Outlet />
        ) : (
          <>
            {/* Header */}
            <div className="mb-10 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                🎓{t("common.My Courses")} 
              </h2>
              <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                {t("common.keep")}
              </p>
            </div>

            {/* Grid of Courses */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <LearnerMyCourseCard />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
