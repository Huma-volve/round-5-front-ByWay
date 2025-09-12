export default function CardCourseLoading() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="cursor-pointer animate-pulse">
          <div className="mb-20 relative">
            <div className="relative">
              <div className="w-full h-44 bg-gray-300 rounded-2xl" />
            </div>

            <div className="border-2 w-full border-gray-200 rounded-2xl mt-3 px-4 py-3 shadow">
              <div className="h-5 bg-gray-300 rounded w-3/4 mb-3" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />

              <div className="flex items-center mb-4">
                <div className="h-4 w-24 bg-gray-300 rounded" />
              </div>

              <div className="h-4 bg-gray-200 rounded w-full mb-4" />

              <div className="flex justify-between items-center">
                <div className="h-5 w-16 bg-gray-300 rounded" />
                <div className="h-7 w-20 bg-gray-400 rounded" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
