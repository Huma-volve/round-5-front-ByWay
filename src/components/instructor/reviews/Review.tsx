
import { useTranslation } from "react-i18next";
import activeStarIcon from "../../../assets/images/icons/star-active-icon.svg";
import inactiveStarIcon from "../../../assets/images/icons/star-inactive-icon.svg";
import person from "../../../assets/images/person.png";
type ReviewProps = {
  variant?: "course" | "user";
  review :{
    
     review : string
     rating : number
     created_at: string
      user: { //id: number,
                    name: string,}  };  }

export default function Review({
  variant = "user",
  review
}: ReviewProps) {
  const { t } = useTranslation();

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
                {Array(review.rating)
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
                {Array(5 - review.rating).fill(0).map((_, i) => (
                    <img key={i} src={inactiveStarIcon} alt="Star" loading="lazy" className="w-4 h-4 opacity-50"
                    />))}
              </span>
            </p>
            <p className="flex flex-col md:flex-row  md:gap-2 text-sm sm:text-base">
              <span className="font-medium">{t("instructor.review")}:</span>
              <span>{review.review}</span>
            </p>
          </>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex gap-3 items-center">
                <img
                  src={person}
                  loading="lazy"
                  alt={review?.user?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <p className="font-bold text-sm sm:text-base">{review?.user?.name}</p>
              </div>

              <div className="flex items-center gap-1">
                {/* <span className="text-sm font-medium">{`${rating} Ratings`}</span> */}
                <span className="flex gap-1">
                  {Array(review.rating)
                    .fill(0)
                    .map((_, i) => (
                      <img
                        key={i}
                        src={activeStarIcon}
                        alt="Star"
                        className="w-4 h-4"
                      />
                    ))}
                  {Array(5 - review.rating)
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

              <span className="text-xs text-gray-500">{review.created_at}</span>
            </div>
            <p className="max-w-lg text-sm sm:text-base leading-relaxed">
              {review.review}
            </p>
          </>
        )}
      </div>
    </>
  );
}
