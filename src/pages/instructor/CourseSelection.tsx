import Breadcrumb from "@/components/common/Breadcrumb";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import { useCourse } from "@/hooks/useCourseData";
import { useCourseManagement } from "@/hooks/useCourseManagement";
import { createCourseActions } from "@/data/courseActionsData";
import CourseActionCard from "@/components/instructor/addCourse/CourseActionCard";
import CourseManagementTips from "@/components/instructor/addCourse/CourseManagementTips";
import DeleteConfirmationModal from "@/components/instructor/DeleteConfirmationModal";
import { useTranslation } from "react-i18next";

export default function CourseSelection() {
  const { getAutoBreadcrumb } = useBreadcrumb();
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const { course } = useCourse(courseId);
  const { t } = useTranslation();

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
      <div className="flex md:gap-52 items-center flex-col gap-4 md:flex-row mb-10">
        <Breadcrumb items={getAutoBreadcrumb(undefined, course?.title)} />
      </div>
        <h1 className="text-3xl font-bold mb-20 text-center">
          {t("instructor.courseManagement.title")}
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
