// import Breadcrumb from "@/components/common/Breadcrumb";
import AddCourseForm from "@/components/instructor/addCourse/AddCourseForm";
// import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import NewBreadCrumb from "@/components/common/NewBreadCrumb";

export default function AddCourse() {
    // const { getAutoBreadcrumb } = useBreadcrumb();
    const { t } = useTranslation();
    const breadcrumbItems = useMemo(() => [
      { label: "common.home", link: "/" },
      { label: "common.myCourses", link: "/instructor/my-courses" },
      { label: "instructor.AddCourse" },
    ], []);
  return (
    <div className="w-full bg-[var(--secondary-background)]">
      <div className="container py-3 pb-8 mt-6">
        <div className="">
          {/* <Breadcrumb items={getAutoBreadcrumb()} /> */}
          <NewBreadCrumb items={breadcrumbItems} />
        </div>
          <h1 className="text-3xl font-bold mb-20 text-center">{t("instructor.addCourse.title")}</h1>
        <AddCourseForm />
      </div>
    </div>
  );
}
