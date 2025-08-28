import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ViewLessonsContentSkeletonProps {
  showCourseHeader?: boolean;
  cardCount?: number;
}

/**
 * Skeleton component for ViewLessonsContent
 *
 * Usage examples:
 * - Loading with course header: <ViewLessonsContentSkeleton showCourseHeader={true} cardCount={6} />
 * - Loading without header: <ViewLessonsContentSkeleton showCourseHeader={false} cardCount={3} />
 * - Individual card skeleton: <LessonCardSkeleton />
 * - Empty state skeleton: <EmptyLessonsViewSkeleton />
 */
export default function ViewLessonsContentSkeleton({
  showCourseHeader = true,
  cardCount = 6,
}: ViewLessonsContentSkeletonProps) {
  return (
    <div className="w-full">
      <div className="w-full max-w-6xl mx-auto">
        {/* Course Info Header Skeleton */}
        {showCourseHeader && (
          <div className="mb-8 p-6 bg-gray-100 rounded-lg border shadow-sm">
            <div className="flex items-start justify-between flex-col sm:flex-row gap-4">
              <div className="flex-1 min-w-0 max-w-full">
                {/* Course Title */}
                <Skeleton className="h-8 w-3/4 mb-2" />

                {/* Course Description */}
                <div className="mb-4">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>

                {/* Course Stats */}
                <div className="flex gap-4 text-sm flex-wrap">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>

              {/* Add Lesson Button */}
              <div className="flex-shrink-0">
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>
        )}

        {/* Lessons Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: cardCount }).map((_, index) => (
            <LessonCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Individual Lesson Card Skeleton
export function LessonCardSkeleton() {
  return (
    <Card className="h-[240px] flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {/* Lesson Title */}
              <Skeleton className="h-6 w-3/4" />
            </div>
            {/* Lesson Description */}
            <div className="h-10">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1 ml-3 flex-shrink-0">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Duration */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Materials */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        {/* Order and Date - Always at bottom */}
        <div className="flex justify-between items-center pt-2 border-t mt-4">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}

// Loading State for Empty Lessons View
export function EmptyLessonsViewSkeleton() {
  return (
    <div className="w-full">
      <div className="w-full max-w-6xl mx-auto">
        {/* Course Info Header Skeleton */}
        <div className="mb-8 p-6 bg-gray-100 rounded-lg border shadow-sm">
          <div className="flex items-start justify-between flex-col sm:flex-row gap-4">
            <div className="flex-1 min-w-0 max-w-full">
              <Skeleton className="h-8 w-3/4 mb-2" />
              <div className="mb-4">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="flex gap-4 text-sm flex-wrap">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <div className="flex-shrink-0">
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>

        {/* Empty State Skeleton */}
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <Skeleton className="h-6 w-48 mx-auto mb-2" />
          <Skeleton className="h-4 w-80 mx-auto mb-6" />
          <Skeleton className="h-10 w-40 mx-auto" />
        </div>
      </div>
    </div>
  );
}
