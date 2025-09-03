import Breadcrumb from "@/components/common/Breadcrumb";
import UpdateLessonForm from "@/components/instructor/updateLesson/UpdateLessonForm";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { useTranslation } from "react-i18next";

export default function EditLesson() {
  const { getAutoBreadcrumb } = useBreadcrumb();
  const { t } = useTranslation();

  return (
    <div className="w-full bg-[var(--secondary-background)]">
      <div className="container py-3 mt-6">
        <div className="flex flex-col gap-4 mb-14">
          <Breadcrumb items={getAutoBreadcrumb()} />
          <h1 className="text-3xl font-bold text-center mt-1">
            {t("instructor.lessons.editLesson")}
          </h1>
        </div>
        <UpdateLessonForm />
      </div>
    </div>
  );
}
