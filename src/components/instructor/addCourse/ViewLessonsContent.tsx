import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useCourse, useLessons } from "@/hooks/useCourseData";
import LessonCard from "@/components/instructor/addCourse/LessonCard";
import DeleteConfirmationModal from "@/components/instructor/DeleteConfirmationModal";
import type { Lesson } from "@/data/coursesData";
import { useTranslation } from "react-i18next";

export default function ViewLessonsContent() {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const { course, loading: courseLoading } = useCourse(courseId);
  const { t } = useTranslation();
  const {
    lessons,
    loading: lessonsLoading,
    deleteLesson,
  } = useLessons(courseId);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState<Lesson | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditLesson = (lesson: Lesson) => {
    navigate(`/instructor/courses/${courseId}/lessons/edit/${lesson.id}`);
  };

  const handleDeleteLesson = (lesson: Lesson) => {
    setLessonToDelete(lesson);
    setDeleteModalOpen(true);
  };

  const confirmDeleteLesson = async () => {
    if (!lessonToDelete) return;

    setIsDeleting(true);
    // Simulate API call
    setTimeout(() => {
      deleteLesson(lessonToDelete.id);
      setIsDeleting(false);
      setDeleteModalOpen(false);
      setLessonToDelete(null);
    }, 1500);
  };

  const handleAddNewLesson = () => {
    navigate(`/instructor/courses/${courseId}/lessons/add`);
  };

  if (courseLoading || lessonsLoading) {
    return (
      <div className="w-full">
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading course lessons...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full max-w-6xl mx-auto">
        {/* Course Info Header */}
        {course && (
          <div className="mb-8 p-6 bg-gray-100 rounded-lg border shadow-sm">
            <div className="flex items-start justify-between flex-col sm:flex-row gap-4">
              <div className="flex-1 min-w-0 max-w-full">
                <h2 className="text-2xl font-semibold mb-2 truncate">
                  {course.title}
                </h2>
                <p className="text-muted-foreground mb-4 line-clamp-2 sm:line-clamp-none">
                  {course.description}
                </p>
                <div className="flex gap-4 text-sm text-muted-foreground flex-wrap">
                  <span>
                    {t("instructor.lessons.totalLessons", {
                      count: lessons.length,
                    })}
                  </span>
                  <span>
                    {t("instructor.lessons.duration", { minutes: course.totalDuration })}
                  </span>
                  <span className="capitalize">{course.status}</span>
                </div>
              </div>
              <Button
                onClick={handleAddNewLesson}
                className="gap-2 text-primary hover:text-white bg-white hover:bg-primary flex-shrink-0"
              >
                <Plus className="h-4 w-4" />
                {t("instructor.lessons.addLessons")}
              </Button>
            </div>
          </div>
        )}

        {/* Lessons Grid */}
        {lessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                onEdit={handleEditLesson}
                onDelete={handleDeleteLesson}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {t("instructor.lessons.noLessons")}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t("instructor.lessons.noLessonsDescription")}
            </p>
            <Button
              onClick={handleAddNewLesson}
              className="gap-2 text-primary hover:text-white bg-white hover:bg-primary"
            >
              <Plus className="h-4 w-4" />
              {t("instructor.lessons.addFirstLesson")}
            </Button>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setLessonToDelete(null);
          }}
          onConfirm={confirmDeleteLesson}
          title={t("instructor.deleteModal.deleteTitle", {
            itemType: t("instructor.lessons.title"),
          })}
          description={t("instructor.deleteModal.lessonDeleteDescription")}
          itemName={lessonToDelete?.title || t("instructor.lessons.title")}
          isLoading={isDeleting}
        />
      </div>
    </div>
  );
}
