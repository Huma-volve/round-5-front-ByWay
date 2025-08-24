import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import useStatsHome from "@/hooks/LearnerCourses/useStatsHome";

function StatsCourses() {
  const { t } = useTranslation();
  const { data, error, isError, isLoading } = useStatsHome();
  const stats = [
    {
      id: 1,
      value: data?.courses || "250",
      label: "Courses",
    },
    {
      id: 2,
      value: data?.reviews || "120",
      label: "reviews",
    },
    {
      id: 3,
      value: data?.learners || "5k",
      label: "Students",
    },
    {
      id: 4,
      value: data?.instructors || "10",
      label: "teachers",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 mx-10 mt-14 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        {data &&
          stats.map((item, index) => (
            <div
              key={item.id}
              className={`text-center lg:border-r-4 border-[--category] ${
                i18next.language == "en"
                  ? index === stats.length - 1
                    ? "border-none"
                    : ""
                  : index === stats.length - 4
                  ? "border-none"
                  : ""
              }`}
            >
              <h2 className="font-[600] text-3xl mb-2">{item.value}+</h2>
              <p className="text-sm">
                {t("common.numberOf")} {item.label}
              </p>
            </div>
          ))}
      </div>
      <div className="mx-10 mt-32">
        <div className="flex justify-between items-center mb-7">
          <h3 className="text-lg font-semibold">{t("common.allCourses")}</h3>
          <Link to="/courses" className="text-[var(--category-icon)] text-sm">
            {t("common.seeAll")}
          </Link>
        </div>
      </div>
    </>
  );
}

export default StatsCourses;
