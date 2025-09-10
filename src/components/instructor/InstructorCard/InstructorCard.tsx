import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Edit } from "lucide-react";
import instructors from "@/data/instructors";

export default function InstructorCard() {
  const { t } = useTranslation();
 const instructor = instructors[0];

  return (
    <div
  
      className="flex justify-between py-6 w-full"
    >
      <div>
        <p className="text-sm text-gray-500">{t("common.instructor")}</p>
        <h2 className="text-lg font-semibold">{instructor.name}</h2>
        <p className="text-sm text-gray-600">{instructor.email}</p>

        <div className="flex gap-6 mt-4">
          <div>
            <p className="text-success font-medium">
              {t("instructor.Total Students")}
            </p>
            <p className="font-semibold">{instructor.statistics.total_students}</p>
          </div>
          <div>
            <p className="text-danger font-medium">{t("instructor.reviews")}</p>
            <p className="font-semibold">{instructor.statistics.average_rating}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 flex items-center justify-center bg-blue-200 rounded-full text-blue-600 text-2xl font-bold">
          {instructor.name.charAt(0)}
        </div>

        <Link
          to="/instructor/profile"
          onClick={(e) => e.stopPropagation()}
          className="text-gray-500 hover:text-blue-600"
        >
          <Edit size={20} />
        </Link>
      </div>
    </div>
  );
}
