export default function CourseDetailsLoading() {
  return (
    <div className="md:mx-24 mx-5 mt-12">
      <div className="flex gap-5 mb-8">
        <p className="h-5 w-20 bg-gray-200 rounded-md animate-pulse"></p>
        <p className="h-5 w-20 bg-gray-300 rounded-md animate-pulse"></p>
        <p className="h-5 w-20 bg-gray-200 rounded-md animate-pulse"></p>
      </div>
      <div className="flex flex-col gap-8">
        <p className="h-8 w-40 bg-gray-200 rounded-md animate-pulse"></p>
        <p className="h-5 w-[70%] bg-gray-200 rounded-md animate-pulse"></p>
        <p className="h-5 w-[20%] bg-gray-200 rounded-md animate-pulse"></p>
        <div className="flex gap-5">
          <p className="h-5 w-[20%] bg-gray-200 rounded-md animate-pulse"></p>
          <p className="h-5 w-[20%] bg-gray-200 rounded-md animate-pulse"></p>
        </div>
        <p className="h-5 w-20 bg-gray-200 rounded-md animate-pulse"></p>
        <p className="h-10 w-52 bg-gray-200 rounded-md animate-pulse"></p>
      </div>
    </div>
  );
}
