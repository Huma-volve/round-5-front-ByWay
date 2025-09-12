// import Breadcrumb from "@/components/common/Breadcrumb";
// import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";
import NewBreadCrumb from "@/components/common/NewBreadCrumb";
// import { useCourse } from "@/hooks/useCourseData";
import { useCourseManagement } from "@/hooks/useCourseManagement";
import { createCourseActions } from "@/data/courseActionsData";
import CourseActionCard from "@/components/instructor/addCourse/CourseActionCard";
import CourseManagementTips from "@/components/instructor/addCourse/CourseManagementTips";
import DeleteConfirmationModal from "@/components/instructor/DeleteConfirmationModal";
import { useTranslation } from "react-i18next";
import useFetchCourseById from "@/hooks/instructor/useFetchCourseById";

export default function CourseSelection() {
  // const { getAutoBreadcrumb } = useBreadcrumb();
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const { data,isLoading } = useFetchCourseById(courseId);
  const course = data?.data;  
  const { t } = useTranslation();
  const breadcrumbItems = useMemo(
    () => [
      { label: "common.home", link: "/" },
      { label: "instructor.courseManagement.title" },
    ],[]
  );

  const {
    deleteModalOpen,
    setDeleteModalOpen,
    isDeleting,
    handleDeleteCourse,
  } = useCourseManagement(navigate, courseId);

  const courseActions = createCourseActions(
    courseId,
    navigate,
    setDeleteModalOpen,
    t
  );

  return (
    <div className="container my-3">
      <div className="">
        {/* <Breadcrumb items={getAutoBreadcrumb(undefined, course?.title)} /> */}
        <NewBreadCrumb items={breadcrumbItems} />
      </div>
      <h1 className="text-3xl font-bold mb-20 text-center flex justify-center">
        {isLoading ? (
          <p className="text-center h-12 w-1/2 bg-gray-200 animate-pulse" ></p>
        ) : (
          course?.title || t("instructor.courseManagement.title")
        )}
      </h1>
      {/* <h2></h2> */}

      <div className="mt-8">
        <div className="mb-6">
          <p className="text-muted-foreground">
            {t("instructor.courseManagement.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courseActions.map((action) => (
            <CourseActionCard key={action.id} action={action} />
          ))}
        </div>

        <CourseManagementTips />
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteCourse}
        title={t("instructor.deleteModal.deleteTitle", {
          itemType: t("instructor.courseManagement.actions.deleteCourse.title"),
        })}
        description={t("instructor.deleteModal.courseDeleteDescription")}
        itemName={
          course?.title ||
          t("instructor.courseManagement.actions.deleteCourse.title")
        }
        isLoading={isDeleting}
      />
    </div>
  );
}
