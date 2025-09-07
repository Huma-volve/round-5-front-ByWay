// import Breadcrumb from "@/components/common/Breadcrumb";
import CardCourse from "@/components/learnerCourses/CardCourse";
import useInstructorDetails from "@/hooks/LearnerCourses/useInstructorDetails";
// import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { CircleUser, Loader2 } from "lucide-react";
import { useMemo } from "react";
import NewBreadCrumb from "@/components/common/NewBreadCrumb";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

function InstructorDetails() {
  const { t } = useTranslation();
  const { instructorId } = useParams();
  // const { getAutoBreadcrumb } = useBreadcrumb();
  const { instructor, error, isLoading } = useInstructorDetails(instructorId!);
  const breadcrumbItems = useMemo(() => [
    { label: "common.home", link: "/" },
    { label: instructor?.instructor?.name || "Instructor Details" },
  ], [instructor?.instructor?.name]);
  const courses = instructor?.courses?.data;
  if (!instructorId) {
    return (
      <div className="flex items-center justify-center h-screen">
        Instructor ID not provided
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        Error loading reviews
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mx-auto h-screen">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-gray-600" />
          <span className="text-sm text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-12">
      <div className="mb-10">
        {/* <Breadcrumb items={getAutoBreadcrumb()} /> */}
        <NewBreadCrumb items={breadcrumbItems} />
      </div>
      <div>
        <div className="flex items-center flex-wrap md:justify-start justify-center gap-2">
          <CircleUser size={100} />
          <h3 className="font-[500]">{instructor?.instructor?.name}</h3>
        </div>
        <div>
          <div className="my-10 flex items-center flex-wrap md:justify-start justify-center gap-10 md:gap-40">
            <div className="text-center">
              <p className="font-[600] text-xl mb-1">
                {instructor?.statistics?.total_students}+
              </p>
              <p>
                {t("common.numberOf")} {t("common.students")}
              </p>
            </div>
            <div className="text-center">
              <p className="font-[600] text-xl mb-1">
                {instructor?.statistics?.average_rating}+
              </p>
              <p>
                {t("common.numberOf")} {t("instructor.reviews")}
              </p>
            </div>
          </div>
          <div>
            <p className="font-[600] text-xl">{t("common.aboutMe")}</p>
            <p className="my-5">
              {instructor?.profile?.bio || "instructor bio"}
            </p>
          </div>
        </div>
      </div>
      <p className="text-lg font-[600]">{t("common.myCourses")}</p>
      <div className="grid my-10 grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 justify-center">
        <CardCourse
          courses={courses || []}
          error={!!error}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default InstructorDetails;
