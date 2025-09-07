// LearnerMyCourses.jsx
// import Breadcrumb from "@/components/common/Breadcrumb";
import LearnerMyCourseCard from "@/components/learnerCourses/LearnerMyCourseCard";
// import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { Outlet, useParams } from "react-router-dom";
import { useMemo } from "react";
import NewBreadCrumb from "@/components/common/NewBreadCrumb";

export default function LearnerMyCourses() {
  // const { getAutoBreadcrumb } = useBreadcrumb();
  const breadcrumbItems = useMemo(() => [
    { label: "common.home", link: "/" },
    { label: "common.learnermycourse" },
  ], []);
  const { learnerCourseId } = useParams(); 

  return (
    <div className="bg-background container py-6">
      {/* <Breadcrumb items={getAutoBreadcrumb()} className="mb-6" /> */}
      <NewBreadCrumb items={breadcrumbItems} />

      {learnerCourseId ? (
        <Outlet />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
          <LearnerMyCourseCard />
        </div>
      )}
    </div>
  );
}
