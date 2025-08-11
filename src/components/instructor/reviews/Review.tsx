import { useTranslation } from "react-i18next";
import type { InstructorReview } from "../../../data/instructorReviewsData";
import activeStarIcon from "../../../assets/images/icons/star-active-icon.svg";
import inactiveStarIcon from "../../../assets/images/icons/star-inactive-icon.svg";

export default function Review({
  courseName,
  review,
  rating,
}: InstructorReview) {
  const { t } = useTranslation();
  return (
    <div className="border p-4 rounded-2xl shadow-sm mb-4 flex flex-col gap-3 mx-8 lg:mx-0 hover:shadow-md transition-shadow duration-200">
      <h3 className="flex  sm:items-center gap-2">
        <p className="whitespace-nowrap">{t("instructor.courseName")}: </p><p className="font-bold">{courseName}</p>
      </h3>
      <p className="flex flex-col md:gap-2 md:flex-row ">
        {t("instructor.review")}: <span className="">{review}</span>
      </p>
      <p className="flex items-center gap-2">
        {t("instructor.rating")}:{" "}
        <span className="flex gap-1">
          {Array(rating)
            .fill(0)
            .map((_, i) => (
              <img
                key={i}
                src={activeStarIcon}
                alt="Star"
                className="w-4 h-4"
              />
            ))}
          {Array(5 - rating)
            .fill(0)
            .map((_, i) => (
              <img
                key={i}
                src={inactiveStarIcon}
                alt="Star"
                className="w-4 h-4 opacity-50"
              />
            ))}
        </span>
      </p>
    </div>
  );
}
