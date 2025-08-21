import { Video, Eye, Trash2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface CourseAction {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  action: () => void;
  primary?: boolean;
  destructive?: boolean;
}

export const createCourseActions = (
  courseId: string | undefined,
  navigate: (path: string) => void,
  setDeleteModalOpen: (open: boolean) => void,
  t: (key: string) => string
): CourseAction[] => [
  {
    id: "add-lessons",
    title: t("instructor.courseManagement.actions.addLessons.title"),
    description: t(
      "instructor.courseManagement.actions.addLessons.description"
    ),
    icon: Video,
    action: () => {
      if (courseId) {
        navigate(`/instructor/my-courses/${courseId}/lessons`);
      } else {
        navigate("/instructor/add-lessons");
      }
    },
    primary: true,
  },
  {
    id: "view-lessons",
    title: t("instructor.courseManagement.actions.viewLessons.title"),
    description: t(
      "instructor.courseManagement.actions.viewLessons.description"
    ),
    icon: Eye,
    action: () => {
      if (courseId) {
        navigate(`/instructor/my-courses/${courseId}/lessons`);
      }
    },
    primary: false,
  },
  {
    id: "delete-course",
    title: t("instructor.courseManagement.actions.deleteCourse.title"),
    description: t(
      "instructor.courseManagement.actions.deleteCourse.description"
    ),
    icon: Trash2,
    action: () => setDeleteModalOpen(true),
    destructive: true,
  },
];
