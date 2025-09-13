export default function UserProfileSkeleton() {
  return (
    <div className="bg-white shadow-sm border rounded-lg p-6 grid md:grid-cols-2 gap-6 animate-pulse">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div key={idx} className="flex flex-col gap-2">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-5 w-40 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
}
