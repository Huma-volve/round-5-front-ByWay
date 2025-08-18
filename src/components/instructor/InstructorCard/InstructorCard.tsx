import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function InstructorCard() {
  const { t } = useTranslation();
  return (
    <Link
      to="/instructor/course-details"
      className="flex  justify-between py-6  w-full "
    >
      <div>
        <p className="text-sm text-gray-500">{t("common.instructor")}</p>
        <h2 className="text-lg font-semibold">Omnya Ali</h2>
        <p className="text-sm text-gray-600">
          Web developer, UX/UI Designer, and Teacher
        </p>

        <div className="flex gap-6 mt-4">
          <div>
            <p className="text-success font-medium">
              {t("instructor.Total Students")}
            </p>
            <p className="font-semibold">1000</p>
          </div>
          <div>
            <p className="text-danger font-medium">{t("instructor.reviews")}</p>
            <p className="font-semibold">154</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 flex items-center justify-center bg-blue-200 rounded-full text-blue-600 text-2xl font-bold">
          O
        </div>
      </div>
    </Link>
  );
}
