import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Clock, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Lesson } from "@/data/coursesData";

interface LessonCardProps {
  lesson: Lesson;
  onEdit: (lesson: Lesson) => void;
  onDelete: (lesson: Lesson) => void;
}

export default function LessonCard({
  lesson,
  onEdit,
  onDelete,
}: LessonCardProps) {
  const { t } = useTranslation();
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow h-[240px] flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg truncate">{lesson.title}</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 h-10">
              {lesson.description}
            </p>
          </div>
          <div className="flex gap-1 ml-3 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(lesson)}
              className="h-8 w-8 p-0 hover:text-white hover:bg-gray-500 bg-white text-gray-700"
              aria-label={t("instructor.lessons.editAction")}
              title={t("instructor.lessons.editAction")}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(lesson)}
              className="h-8 w-8 p-0 hover:text-white hover:bg-red-500 bg-white text-red-500"
              aria-label={t("instructor.lessons.deleteAction")}
              title={t("instructor.lessons.deleteAction")}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Duration */}
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{formatDuration(lesson.duration)}</span>
          </div>

          {/* Materials */}
          {lesson.materials.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {t("instructor.lessons.materials", {
                  count: lesson.materials.length,
                })}
              </span>
            </div>
          )}
        </div>

        {/* Order and Date - Always at bottom */}
        <div className="flex justify-between items-center text-xs text-muted-foreground pt-2 border-t mt-4">
          <span>{t("instructor.lessons.lesson", { order: lesson.order })}</span>
          <span>
            {t("instructor.lessons.updated", {
              date: new Date(lesson.updatedAt).toLocaleDateString(),
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
