import { useState } from "react";
import useDeleteCourse from "./instructor/useDeleteCourse";

export const useCourseManagement = (navigate: (path: string) => void, courseId: string|undefined) => {
  const { mutate: deleteCourse, isPending: isDeleting  } = useDeleteCourse(courseId);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteCourse = async () => {
    deleteCourse();
    setDeleteModalOpen(false);
    navigate("/instructor/home");
  };

  return {
    deleteModalOpen,
    setDeleteModalOpen,
    isDeleting,
    handleDeleteCourse,
  };
};
