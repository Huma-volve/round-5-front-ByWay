type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  message = "Something went wrong!",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center pt-12 text-center">
      <div className="flex flex-col items-center justify-center mb-4 p-4 rounded-md bg-red-50 border-red-200 border" >
        <p className="text-red-600 font-medium ">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Retry
        </button>
      )}
    </div>
  );
}
