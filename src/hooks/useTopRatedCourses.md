# useTopRatedCourses Hook

A custom React Query hook for fetching top-rated courses from the API with built-in error handling and toast notifications.

## Features

- ✅ Automatic error handling with toast notifications
- ✅ Configurable success/error toast messages
- ✅ Built-in loading and error states
- ✅ Automatic retries with exponential backoff
- ✅ Stale data management
- ✅ TypeScript support
- ✅ Conditional fetching support

## Installation

Make sure you have the required dependencies:

```bash
npm install @tanstack/react-query react-toastify axios
```

## API Endpoint

**GET** `dashboard/top-rated-courses`

### Response Format

```json
{
  "status": 200,
  "message": "Top rated courses retrieved successfully",
  "data": [
    {
      "id": 4,
      "title": "Course Title",
      "average_rating": 4.33,
      "reviews_count": 3,
      "instructor_name": "Instructor Name"
    }
  ]
}
```

## Basic Usage

```tsx
import { useTopRatedCourses } from "@/hooks/useTopRatedCourses";

function TopRatedCourses() {
  const { data, isLoading, isError, error } = useTopRatedCourses();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div>
      {data?.data?.map((course) => (
        <div key={course.id}>
          <h3>{course.title}</h3>
          <p>Rating: {course.average_rating.toFixed(1)}</p>
          <p>Reviews: {course.reviews_count}</p>
          <p>Instructor: {course.instructor_name || "N/A"}</p>
        </div>
      ))}
    </div>
  );
}
```

## Advanced Usage

### Custom Options

```tsx
const { data, isLoading, refetch } = useTopRatedCourses({
  enabled: true, // Enable/disable the query
  showSuccessToast: false, // Don't show success toast
  showErrorToast: true, // Show error toast (default)
  staleTime: 10 * 60 * 1000, // 10 minutes stale time
  gcTime: 15 * 60 * 1000, // 15 minutes garbage collection time
});
```

### Conditional Fetching

```tsx
function ConditionalExample({ shouldFetch }: { shouldFetch: boolean }) {
  const { data, isLoading } = useTopRatedCourses({
    enabled: shouldFetch, // Only fetch when shouldFetch is true
  });

  return (
    <div>
      {!shouldFetch && <div>Data fetching is disabled</div>}
      {shouldFetch && isLoading && <div>Loading...</div>}
    </div>
  );
}
```

### Manual Refetch

```tsx
function RefetchExample() {
  const { data, refetch, isFetching } = useTopRatedCourses();

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div>
      <button onClick={handleRefresh} disabled={isFetching}>
        {isFetching ? "Refreshing..." : "Refresh"}
      </button>
      {/* Your content */}
    </div>
  );
}
```

## Hook Options

| Option             | Type      | Default           | Description                                        |
| ------------------ | --------- | ----------------- | -------------------------------------------------- |
| `enabled`          | `boolean` | `true`            | Enable or disable the query                        |
| `showSuccessToast` | `boolean` | `true`            | Show success toast notification                    |
| `showErrorToast`   | `boolean` | `true`            | Show error toast notification                      |
| `staleTime`        | `number`  | `300000` (5 min)  | Time in ms before data is considered stale         |
| `gcTime`           | `number`  | `600000` (10 min) | Time in ms before unused data is garbage collected |

## Return Values

The hook returns all standard React Query return values:

| Property     | Type                                   | Description                               |
| ------------ | -------------------------------------- | ----------------------------------------- |
| `data`       | `TopRatedCoursesResponse \| undefined` | The fetched data                          |
| `isLoading`  | `boolean`                              | True during initial loading               |
| `isError`    | `boolean`                              | True if an error occurred                 |
| `error`      | `Error \| null`                        | Error object if one occurred              |
| `isFetching` | `boolean`                              | True during any fetch (including refetch) |
| `refetch`    | `() => Promise<QueryObserverResult>`   | Function to manually refetch              |
| `isSuccess`  | `boolean`                              | True if the query was successful          |

## Types

```typescript
interface TopRatedCourse {
  id: number;
  title: string;
  average_rating: number;
  reviews_count: number;
  instructor_name: string | null;
}

interface TopRatedCoursesResponse {
  status: number;
  message: string;
  data: TopRatedCourse[];
}
```

## Error Handling

The hook automatically handles errors and displays toast notifications. Errors are also available through the `error` property for custom handling.

## Toast Notifications

- **Success**: Shown when data is successfully fetched (can be disabled)
- **Error**: Shown when an error occurs during fetching (can be disabled)

## Query Key

The hook uses the query key `["topRatedCourses"]` for caching and invalidation.

## Dependencies

- `@tanstack/react-query`: For data fetching and caching
- `react-toastify`: For toast notifications
- `axios`: For HTTP requests (via axiosInstance)
