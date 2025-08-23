interface IncomeTableLoadingDesignProps {
  isAdmin?: boolean;
}

export default function IncomeTableLoadingDesign({
  isAdmin = false,
}: IncomeTableLoadingDesignProps) {
  return (
    <div className="w-full space-y-4 mt-16 mb-8 flex flex-col gap-2">
      {/* Title skeleton */}
      <div
        className={`h-8 w-64 bg-gray-200 animate-pulse rounded-md mb-2 ${
          isAdmin ? "ps-0" : "ps-4"
        }`}
      ></div>

      {/* Search and filter skeletons (only for non-admin) */}
      {!isAdmin && (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between px-4">
          <div className="h-10 w-full sm:max-w-sm bg-gray-200 animate-pulse rounded-md"></div>
          <div className="h-10 w-full sm:w-[180px] bg-gray-200 animate-pulse rounded-md"></div>
        </div>
      )}

      {/* Table skeleton */}
      <div className="rounded-lg mx-4 overflow-x-auto border border-gray-200 shadow-sm">
        <div className="min-w-[600px]">
          {/* Table header skeleton */}
          <div className="flex bg-gray-100 p-4 gap-4 border-b">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex-1 h-6 bg-gray-200 rounded animate-pulse"
              ></div>
            ))}
          </div>

          {/* Table rows skeleton */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex p-4 border-b border-gray-200 gap-4 hover:bg-gray-50"
            >
              {[...Array(4)].map((_, j) => (
                <div
                  key={j}
                  className="flex-1 h-5 bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
          ))}
        </div>

        {/* Mobile scroll hint skeleton */}
        <div className="block sm:hidden p-2 text-center">
          <div className="h-4 w-48 bg-gray-200 animate-pulse rounded mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
