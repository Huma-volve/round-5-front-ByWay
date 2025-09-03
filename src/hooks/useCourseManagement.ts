import { useState } from "react";
import useDeleteCourse from "./instructor/useDeleteCourse";

export const useCourseManagement = (navigate: (path: string) => void, courseId: string|undefined) => {
  const { mutate: deleteCourse  } = useDeleteCourse();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteCourse = async () => {
    setIsDeleting(true);
    // Simulate API call
    deleteCourse(courseId);
    setIsDeleting(false);
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
