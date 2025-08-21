import LessonCard from "../course/LessonCard";

function VideoLearner() {
  const lessons = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <div>
        <video
          controls
          autoPlay
          className="w-full max-w-4xl rounded-lg shadow-lg"
        >
          <source src="" type="video/mp4" />
        </video>
        <h2 className="text-2xl font-semibold mt-10 mb-14">
          Lesson 1: Introduction to UI/UX
        </h2>
      </div>
      {lessons.map((lessonId) => (
        <div
          key={lessonId}
          className="flex items-center justify-between gap-3 border p-3 rounded-lg flex-wrap"
        >
          <div className="flex items-center gap-3">
            <LessonCard />
          </div>
        </div>
      ))}
    </>
  );
}

export default VideoLearner;
