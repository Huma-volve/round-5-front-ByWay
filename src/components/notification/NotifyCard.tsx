import { Check, Trash2 } from "lucide-react";

interface NotifyProps {
  id: string;
  title: string;
  time: string;
  message: string;
  latest: boolean;
  onDelete?: () => void;
  onMarkRead?: (id: string) => void;
}

export default function NotifyCard({
  id,
  title,
  message,
  time,
  latest,
  onDelete,
  onMarkRead,
}: NotifyProps) {
  return (
    <div
      className={`w-[95%] sm:w-[90%] border border-border rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3 py-4 px-4 shadow-sm transition-all ${
        latest ? "bg-[#72727212]" : "bg-white"
      }`}
    >
      {/* Left Section */}
      <div className="flex-1">
        <p
          className={`text-sm sm:text-base md:text-lg font-medium ${
            latest ? "text-success" : "text-black"
          }`}
        >
          {title}
        </p>
        <h5 className="text-xs sm:text-sm text-gray-500">{time}</h5>

        {/* Message */}
        <p className="mt-2 text-sm sm:text-base text-gray-700 leading-relaxed break-words">
          {message}
        </p>
      </div>

      {/* Right Section (Actions) */}
      <div className="flex items-center gap-2 self-end md:self-center">
        <button
          onClick={() => onMarkRead?.(id)}
          className={`p-2 rounded-full hover:bg-green-100 text-green-600 transition ${
            !latest ? "hidden" : "flex"
          }`}
        >
          <Check className="w-5 h-5" />
        </button>

        <button
          onClick={onDelete}
          className="p-2 rounded-full hover:bg-red-100 text-red-500 transition"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
