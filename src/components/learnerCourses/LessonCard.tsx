import { Link, useParams } from "react-router-dom";
interface LessonCardProps {
  lesson: {
    id: number;
    title: string;
    video_url: string;
  };
  index: number;
}
export default function LessonCard({ lesson, index }: LessonCardProps) {
  const { learnerCourseId } = useParams<{ learnerCourseId: string }>();
  return (
    <>
      <div className="flex gap-6  items-center">
        <Link
          to={lesson?.video_url}
          className="h-16 w-20 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center"
        >
          <span className="text-xs text-center">Video</span>
        </Link>
        <div className="flex gap-3 items-center">
          <p>
            Lesson {index + 1}:{" "}
            <Link
              to={`/learner-myCourses/${learnerCourseId}/video/${lesson?.id}`}
              className="font-medium hover:text-blue-600"
            >
              {lesson?.title}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
