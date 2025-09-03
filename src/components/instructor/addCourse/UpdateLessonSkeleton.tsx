export default function UpdateLessonSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="border rounded-lg p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Lesson Title */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>

          {/* Lesson Description */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>

          {/* Lesson Duration */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>

          {/* Video Upload */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/5"></div>
            <div className="h-32 bg-gray-200 rounded border-dashed border-2"></div>
          </div>

          {/* Materials */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
}
