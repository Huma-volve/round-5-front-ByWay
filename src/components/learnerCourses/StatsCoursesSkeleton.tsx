export default function StatsCoursesSkeleton() {
  return (
    <>
      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 mx-10 mt-14 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="text-center lg:border-r-4 border-[--category] animate-pulse"
          >
            {/* Number placeholder */}
            <div className="h-8 w-20 bg-gray-300 rounded mx-auto mb-2"></div>

            {/* Label placeholder */}
            <div className="h-4 w-28 bg-gray-200 rounded mx-auto"></div>
          </div>
        ))}
      </div>

      {/* Courses header skeleton */}
      <div className="mt-32">
        <div className="flex justify-between items-center mb-7">
          <div className="h-5 w-32 bg-gray-300 rounded animate-pulse"></div>
          {/* Optional "see all" skeleton */}
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </>
  );
}
