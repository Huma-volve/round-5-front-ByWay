import activeStarIcon from "../../../assets/images/icons/star-active-icon.svg";
import inactiveStarIcon from "../../../assets/images/icons/star-inactive-icon.svg";

type RatingBarProps = {
  rating: number; 
  percentage: number;
};

const RatingBar = ({ rating, percentage }: RatingBarProps) => {
  return (
    <div className="flex items-center gap-2">
    
      <span className="flex">
        {Array(5).fill(0).map((_, i) => ( 
             <img key={i}  className="w-4 h-4"
             src={i < rating ? activeStarIcon : inactiveStarIcon} alt="Star" />
          ))}
      </span>
       
      <span className="text-sm text-gray-700">{percentage}%</span>
    </div>
  );
};

export default function RatingsOverview() {
  return (
    <div className="flex flex-col gap-2 p-4    w-[80%]">
       <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl font-bold">4.6</span>
        <span className="text-gray-600 text-sm">146,951 reviews</span>
      </div>

      
      <RatingBar rating={5} percentage={80} />
      <RatingBar rating={4} percentage={10} />
      <RatingBar rating={3} percentage={5} />
      <RatingBar rating={2} percentage={3} />
      <RatingBar rating={1} percentage={2} />
    </div>
  );
}
 