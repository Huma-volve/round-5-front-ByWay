import { useState } from "react";

export const useCourseManagement = (navigate: (path: string) => void) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteCourse = async () => {
    setIsDeleting(true);
    // Simulate API call
    setTimeout(() => {
      setIsDeleting(false);
      setDeleteModalOpen(false);
      navigate("/instructor/courses");
    }, 1500);
  };

  return {
    deleteModalOpen,
    setDeleteModalOpen,
    isDeleting,
    handleDeleteCourse,
  };
};
