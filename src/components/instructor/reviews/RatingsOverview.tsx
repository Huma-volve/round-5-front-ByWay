import activeStarIcon from "../../../assets/images/icons/star-active-icon.svg";
import inactiveStarIcon from "../../../assets/images/icons/star-inactive-icon.svg";

type RatingBarProps = {
  rating: number;
  percentage: number;
};

export interface RatingOverviewData {
  ratingOverviewData: {
    average_rating: number;
    total_reviews: number;
    rating_distribution: {
      [key: number]: number; // e.g., 5: 50, 4: 30, etc.
    };
  };
}

const RatingBar = ({ rating, percentage }: RatingBarProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="flex">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <img
              key={i}
              className="w-4 h-4"
              src={i < rating ? activeStarIcon : inactiveStarIcon}
              alt="Star"
            />
          ))}
      </span>

      <span className="text-sm text-gray-700">{percentage}%</span>
    </div>
  );
};

export default function RatingsOverview({ratingOverviewData}:RatingOverviewData) {
  return (
    <div className="flex flex-col gap-2 p-4    w-[80%]">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl font-bold">{ratingOverviewData.average_rating}</span>
        <span className="text-gray-600 text-sm">{ratingOverviewData.total_reviews} reviews</span>
      </div>

      <RatingBar rating={5} percentage={ratingOverviewData.rating_distribution[5]} />
      <RatingBar rating={4} percentage={ratingOverviewData.rating_distribution[4]} />
      <RatingBar rating={3} percentage={ratingOverviewData.rating_distribution[3]} />
      <RatingBar rating={2} percentage={ratingOverviewData.rating_distribution[2]} />
      <RatingBar rating={1} percentage={ratingOverviewData.rating_distribution[1]} />
    </div>
  );
}
