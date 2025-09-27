interface ReviewSkeletonProps {
  variant?: "course" | "user";
}

export default function ReviewSkeleton({
  variant = "course",
}: ReviewSkeletonProps) {
  return (
    <div className="border p-4 rounded-2xl shadow-sm mb-4 flex flex-col gap-3 mx-auto lg:mx-0 w-full lg:w-[80%] animate-pulse">
      {variant === "course" ? (
        <>
          {/* Course Name Skeleton */}
          <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>

          {/* Rating Skeleton */}
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <div className="h-4 w-16 bg-gray-300 rounded"></div>
            <div className="flex gap-1">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
                ))}
            </div>
          </div>

          {/* Review Text Skeleton */}
          <div className="flex flex-col md:flex-row md:gap-2 text-sm sm:text-base">
            <div className="h-4 w-16 bg-gray-300 rounded mb-2 md:mb-0"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* User Review Header Skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex gap-3 items-center">
              {/* User Avatar Skeleton */}
              <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
              {/* User Name Skeleton */}
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
            </div>

            {/* Rating Stars Skeleton */}
            <div className="flex items-center gap-1">
              <div className="flex gap-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
                  ))}
              </div>
            </div>

            {/* Date Skeleton */}
            <div className="h-3 w-20 bg-gray-200 rounded"></div>
          </div>

          {/* Review Text Skeleton */}
          <div className="max-w-lg space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
          </div>
        </>
      )}
    </div>
  );
}
