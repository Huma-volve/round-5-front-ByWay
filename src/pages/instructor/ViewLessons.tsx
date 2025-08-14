import Breadcrumb from "@/components/common/Breadcrumb";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import ViewLessonsContent from "@/components/instructor/addCourse/ViewLessonsContent";
import { useTranslation } from "react-i18next";

export default function ViewLessons() {
  const { getAutoBreadcrumb } = useBreadcrumb();
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <div className="container py-3">
        <div className="flex md:gap-44 items-center flex-col gap-4 md:flex-row mb-10">
          <Breadcrumb items={getAutoBreadcrumb()} />
        </div>
          <h1 className="text-3xl font-bold mb-20 text-center">
            {t("instructor.lessons.title")}
          </h1>
        <ViewLessonsContent />
      </div>
    </div>
  );
}
