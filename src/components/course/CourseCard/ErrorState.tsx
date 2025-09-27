import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
  className?: string;
};

export default function ErrorState({
  message = "Something went wrong!",
  onRetry,
  className = "",
}: ErrorStateProps) {
  return (
    <div
      className={`relative bg-white rounded-xl shadow-lg border border-red-200 p-6 lg:p-8 ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-50 to-orange-50 rounded-full -translate-y-6 translate-x-6 opacity-30"></div>

      <div className="relative flex flex-col items-center justify-center text-center space-y-4">
        {/* Error Icon */}
        <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
          <AlertCircle size={32} className="text-red-600" />
        </div>

        {/* Error Message */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">
            Oops! Something went wrong
          </h3>
          <p className="text-sm text-red-600 max-w-md">{message}</p>
        </div>

        {/* Retry Button */}
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            className="flex items-center gap-2 hover:bg-red-50 hover:border-red-300 transition-colors duration-200"
          >
            <RefreshCw size={16} />
            Try Again
          </Button>
        )}

        {/* Additional Help Text */}
        <p className="text-xs text-gray-500 max-w-sm">
          If this problem persists, please check your internet connection or
          contact support.
        </p>
      </div>
    </div>
  );
}
