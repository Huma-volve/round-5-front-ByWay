import { useTranslation } from "react-i18next";
import activeStarIcon from "../../../assets/images/icons/star-active-icon.svg";
import inactiveStarIcon from "../../../assets/images/icons/star-inactive-icon.svg";

import { CircleUserRound } from "lucide-react";
type ReviewProps = {
  id?: number;
  name?: string;
  rating: number;
  date?: string;
  imageLearner?: string;
  variant?: "course" | "user";
  review: string | {
    review: string;
    rating: number;
    created_at: string;
    user: {
      name: string;
    };
  };
};

export default function Review({
  name,
  review,
  variant = "course",
  imageLearner,
  rating,
}: ReviewProps) {
  const { t } = useTranslation();

  const reviewText = typeof review === 'string' ? review : review.review;
  const reviewRating = typeof review === 'string' ? (rating || 0) : review.rating;

  return (
    <>
      <div className="border p-4 rounded-2xl shadow-sm mb-4 flex flex-col gap-3 mx-auto lg:mx-0 hover:shadow-md transition-shadow duration-200 lg:w-[80%]  ">
        {variant === "course" ? (
          <>
            <h3 className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
              <span className="whitespace-nowrap font-medium">
                {t("instructor.courseName")}:
              </span>
              <span className="font-bold">courseName</span>
            </h3>

            <p className="flex items-center gap-2 text-sm sm:text-base">
              <span className="font-medium">{t("instructor.rating")}:</span>
              <span className="flex gap-1">
                {Array(reviewRating)
                  .fill(0)
                  .map((_, i) => (
                    <img
                      key={i}
                      src={activeStarIcon}
                      alt="Star"
                      loading="lazy"
                      className="w-4 h-4"
                    />
                  ))}
                {Array(5 - reviewRating)
                  .fill(0)
                  .map((_, i) => (
                    <img
                      key={i}
                      src={inactiveStarIcon}
                      alt="Star"
                      loading="lazy"
                      className="w-4 h-4 opacity-50"
                    />
                  ))}
              </span>
            </p>
            <p className="flex flex-col md:flex-row  md:gap-2 text-sm sm:text-base">
              <span className="font-medium">{t("instructor.review")}:</span>
              <span>{reviewText}</span>
            </p>
          </>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex gap-3 items-center">
                {imageLearner ? (
                  <img
                    src={imageLearner}
                    loading="lazy"
                    alt={name}
                    className="size-7 rounded-full object-cover"
                  />
                ) : (
                  <CircleUserRound />
                )}

                <p className="font-bold text-sm sm:text-base">{name}</p>
                <p className="font-bold text-sm sm:text-base">
                  {typeof review === 'object' ? review.user?.name : name}
                </p>
              </div>

              <div className="flex items-center gap-1">
                {/* <span className="text-sm font-medium">{`${rating} Ratings`}</span> */}
                <span className="flex gap-1">
                  {Array(reviewRating)
                    .fill(0)
                    .map((_, i) => (
                      <img
                        key={i}
                        src={activeStarIcon}
                        alt="Star"
                        className="w-4 h-4"
                      />
                    ))}
                  {Array(5 - reviewRating)
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
              </div>

              <span className="text-xs text-gray-500">{typeof review === 'object' ? new Date(review.created_at).toLocaleDateString() : 'N/A'}</span>
            </div>
            <p className="max-w-lg text-sm sm:text-base leading-relaxed">
              <p>{reviewText}</p>
            </p>
          </>
        )}
      </div>
    </>
  );
}
