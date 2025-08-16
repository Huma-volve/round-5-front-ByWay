import React from "react";
import { stats } from "../../data/BrowseCourses";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function StatsCourses() {
  const { t } = useTranslation();

  return (
    <>
      <div className="grid grid-cols-1 mx-10 mt-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {stats.map((item, index) => (
          <div
            key={item.id}
            className={`text-center md:border-r-4 border-[--category] ${
              index === stats.length - 1 ? "border-none" : ""
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
