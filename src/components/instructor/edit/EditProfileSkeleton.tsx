export default function EditProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto animate-pulse">
      <div className="shadow-lg border border-gray-200 bg-white rounded-lg overflow-hidden">
        {/* Header Skeleton */}
        <div className="pb-6 bg-gradient-to-r from-gray-50 to-gray-100 p-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-200 rounded-full">
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
            </div>
            <div>
              <div className="h-8 w-48 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="p-8 space-y-8">
          {/* Profile Image Section Skeleton */}
          <div className="flex flex-col items-center space-y-4 pb-6 border-b border-gray-200">
            <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
            <div className="h-4 w-40 bg-gray-200 rounded"></div>
          </div>

          {/* Basic Information Section Skeleton */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 bg-gray-300 rounded"></div>
              <div className="h-6 w-36 bg-gray-300 rounded"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* About Section Skeleton */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 bg-gray-300 rounded"></div>
              <div className="h-6 w-24 bg-gray-300 rounded"></div>
            </div>

            <div className="space-y-2">
              <div className="h-4 w-12 bg-gray-300 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-3 w-48 bg-gray-200 rounded"></div>
            </div>

            <div className="space-y-2">
              <div className="h-4 w-16 bg-gray-300 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-3 w-56 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Social Links Section Skeleton */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 bg-gray-300 rounded"></div>
              <div className="h-6 w-28 bg-gray-300 rounded"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-300 rounded"></div>
                      <div className="h-4 w-20 bg-gray-300 rounded"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                ))}
            </div>
          </div>

          {/* Submit Button Skeleton */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <div className="h-12 w-32 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
