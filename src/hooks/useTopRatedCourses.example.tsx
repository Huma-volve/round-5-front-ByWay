/**
 * Example usage of useTopRatedCourses hook
 *
 * This file demonstrates various ways to use the custom hook
 * with different options and configurations.
 */

import { useTopRatedCourses } from "@/hooks/useTopRatedCourses";

// Basic usage
export function BasicUsage() {
  const { data, isLoading, isError, error } = useTopRatedCourses();

  // Handle loading, error, and success states
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div>
      {data?.data?.map((course) => (
        <div key={course.id}>{course.title}</div>
      ))}
    </div>
  );
}

// Usage with custom options
export function CustomOptionsUsage() {
  const { data, isLoading, isError, refetch } = useTopRatedCourses({
    enabled: true, // Enable/disable the query
    showSuccessToast: false, // Don't show success toast
    showErrorToast: true, // Show error toast (default)
    staleTime: 10 * 60 * 1000, // 10 minutes stale time
    gcTime: 15 * 60 * 1000, // 15 minutes garbage collection time
  });

  // Manual refetch example
  const handleRefresh = () => {
    refetch();
  };

  return (
    <div>
      <button onClick={handleRefresh}>Refresh Courses</button>
      {/* Rest of your component */}
    </div>
  );
}

// Usage with conditional fetching
export function ConditionalFetching({ shouldFetch }: { shouldFetch: boolean }) {
  const { data, isLoading } = useTopRatedCourses({
    enabled: shouldFetch, // Only fetch when shouldFetch is true
    showSuccessToast: false,
  });

  return (
    <div>
      {!shouldFetch && <div>Data fetching is disabled</div>}
      {shouldFetch && isLoading && <div>Loading...</div>}
      {data && <div>Courses loaded: {data.data?.length}</div>}
    </div>
  );
}

// Usage in a component with error boundary
export function WithErrorHandling() {
  const { data, isLoading, isError, error, refetch } = useTopRatedCourses();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading top-rated courses...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-800 font-semibold">Failed to load courses</h3>
        <p className="text-red-600 text-sm mt-1">
          {error?.message || "An unexpected error occurred"}
        </p>
        <button
          onClick={() => refetch()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  const courses = data?.data || [];

  if (courses.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>No top-rated courses found.</p>
        <button
          onClick={() => refetch()}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          Top Rated Courses ({courses.length})
        </h2>
        <button
          onClick={() => refetch()}
          className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="p-4 border rounded-lg">
            <h3 className="font-semibold">{course.title}</h3>
            <p className="text-sm text-gray-600">
              Instructor: {course.instructor_name || "N/A"}
            </p>
            <p className="text-sm">
              ⭐ {course.average_rating.toFixed(1)} ({course.reviews_count}{" "}
              reviews)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
