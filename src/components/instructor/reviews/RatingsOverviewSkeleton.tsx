const RatingBarSkeleton = () => {
  return (
    <div className="flex items-center gap-2">
      {/* Star Rating Skeleton */}
      <div className="flex gap-1">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
          ))}
      </div>

      {/* Percentage Skeleton */}
      <div className="h-4 w-8 bg-gray-200 rounded"></div>
    </div>
  );
};

export default function RatingsOverviewSkeleton() {
  return (
    <div className="flex flex-col gap-2 p-4 animate-pulse">
      {/* Header Section Skeleton */}
      <div className="flex items-center gap-2 mb-2">
        {/* Average Rating Skeleton */}
        <div className="h-8 w-12 bg-gray-300 rounded"></div>
        {/* Total Reviews Skeleton */}
        <div className="h-4 w-20 bg-gray-200 rounded"></div>
      </div>

      {/* Rating Bars Skeleton - 5 bars for ratings 5 to 1 */}
      <RatingBarSkeleton />
      <RatingBarSkeleton />
      <RatingBarSkeleton />
      <RatingBarSkeleton />
      <RatingBarSkeleton />
    </div>
  );
}
