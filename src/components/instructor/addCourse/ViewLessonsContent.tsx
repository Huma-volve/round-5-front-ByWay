import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import useDeleteLesson from "@/hooks/instructor/useDeleteLesson";
import LessonCard from "@/components/instructor/addCourse/LessonCard";
import ViewLessonsContentSkeleton from "@/components/instructor/addCourse/ViewLessonsContentSkeleton";
import DeleteConfirmationModal from "@/components/instructor/DeleteConfirmationModal";
import { useTranslation } from "react-i18next";
import useFetchCourseById from "@/hooks/instructor/useFetchCourseById";
import type { LessonData } from "@/lib/types";

export default function ViewLessonsContent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const { data: courseResponse, isLoading: courseLoading } =
    useFetchCourseById(courseId);
  // Note: We could use useFetchLessonsByCourse for independent lesson fetching
  // const { data: lessonsResponse, isLoading: lessonsLoading } =
  //   useFetchLessonsByCourse(courseId);
  const { mutate: deleteLessonMutate, isPending: isDeletingApi } =
    useDeleteLesson(courseId || "");

  const course = courseResponse?.data;
  const lessonsResponse = course?.lessons || [];
  console.log(course);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState<LessonData | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditLesson = (lesson: LessonData) => {
    navigate(`/instructor/my-courses/${courseId}/lessons/edit/${lesson.id}`);
  };

  const handleDeleteLesson = (lesson: LessonData) => {
    setLessonToDelete(lesson);
    setDeleteModalOpen(true);
  };

  const confirmDeleteLesson = async () => {
    if (!lessonToDelete || !courseId) return;
    setIsDeleting(true);
    deleteLessonMutate(lessonToDelete.id);
    setIsDeleting(false);
    setDeleteModalOpen(false);
    setLessonToDelete(null);
  };

  const handleAddNewLesson = () => {
    navigate(`/instructor/my-courses/${courseId}/lessons/add`);
  };

  if (courseLoading) {
    return <ViewLessonsContentSkeleton showCourseHeader={true} cardCount={6} />;
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
                      count: course?.lessons_count,
                    })}
                  </span>
                  <span>
                    {t("instructor.lessons.duration", {
                      minutes:
                        course?.lessons.reduce(
                          (sum: number, lesson: LessonData) =>
                            sum + (lesson.video_duration || 0),
                          0
                        ) / 60,
                    })}
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
        {lessonsResponse?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessonsResponse.map((lesson: LessonData) => (
              <LessonCard
                key={lesson.id}
                lesson={{ ...lesson }}
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
          isLoading={isDeleting || isDeletingApi}
        />
      </div>
    </div>
  );
}
