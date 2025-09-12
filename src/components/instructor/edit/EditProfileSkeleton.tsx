export default function EditProfileSkeleton() {
  return (
    <section className="flex items-center min-h-[80vh] justify-center">
      <div className="space-y-6 bg-white p-6 rounded-xl shadow w-full max-w-3xl animate-pulse">
        <div className="h-8 w-1/3 bg-gray-300 rounded"></div>
        
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>

          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>

        <div className="h-10 bg-gray-300 rounded w-full"></div>
      </div>
    </section>
  );
}
