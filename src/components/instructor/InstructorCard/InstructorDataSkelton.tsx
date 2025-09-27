export default function InstructorDataSkelton() {
  return (
    <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 p-6 lg:p-8 animate-pulse">
      {/* Background Pattern Skeleton */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full -translate-y-6 translate-x-6 opacity-30"></div>

      <div className="relative">
        {/* Mobile Image Header Skeleton - Shows only on mobile */}
        <div className="flex lg:hidden justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gray-300 rounded-full shadow-lg border-4 border-white"></div>
            {/* Online Status Indicator Skeleton */}
            <div className="absolute bottom-1 right-1 w-3 h-3 bg-gray-300 border-2 border-white rounded-full"></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          {/* Left Content Skeleton */}
          <div className="flex-1 space-y-4">
            {/* Header Skeleton */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-8 w-64 bg-gray-300 rounded"></div>
            </div>

            {/* Contact Info Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <div className="h-4 w-48 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Bio Section Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-12 bg-gray-300 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            </div>

            {/* About Section Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            </div>

            {/* Social Links Skeleton */}
            <div className="flex flex-wrap gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            </div>

            {/* Stats Skeleton */}
            <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div>
                  <div className="h-3 w-20 bg-gray-200 rounded mb-1"></div>
                  <div className="h-5 w-8 bg-gray-300 rounded"></div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div>
                  <div className="h-3 w-16 bg-gray-200 rounded mb-1"></div>
                  <div className="h-5 w-12 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Skeleton - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:flex flex-col items-center gap-4 lg:min-w-[140px]">
            {/* Profile Image Skeleton */}
            <div className="relative">
              <div className="w-28 h-28 bg-gray-300 rounded-full shadow-lg border-4 border-white"></div>
              {/* Online Status Indicator Skeleton */}
              <div className="absolute bottom-2 right-2 w-4 h-4 bg-gray-300 border-2 border-white rounded-full"></div>
            </div>

            {/* Edit Button Skeleton */}
            <div className="w-full h-9 bg-gray-200 rounded border"></div>
          </div>
        </div>

        {/* Mobile Edit Button Skeleton - Shows only on mobile */}
        <div className="flex lg:hidden justify-center mt-6">
          <div className="h-9 w-32 bg-gray-200 rounded border"></div>
        </div>
      </div>
    </div>
  );
}
