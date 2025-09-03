import { useTranslation } from "react-i18next";

export default function CourseManagementTips() {
  const { t } = useTranslation();

  return (
    <div className="mt-8 p-4 bg-muted rounded-lg">
      <h3 className="font-semibold mb-2">
        {t("instructor.courseManagement.tips.title")}
      </h3>
      <ul className="space-y-1 text-sm text-muted-foreground">
        <li>• {t("instructor.courseManagement.tips.tip1")}</li>
        <li>• {t("instructor.courseManagement.tips.tip3")}</li>
        <li>• {t("instructor.courseManagement.tips.tip4")}</li>
      </ul>
    </div>
  );
}
