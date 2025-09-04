export default function LoadingCards() {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 animate-pulse">
      <div className="w-12 h-12 md:w-10 md:h-10 bg-gray-300 rounded-md"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
    </div>
  );
}
