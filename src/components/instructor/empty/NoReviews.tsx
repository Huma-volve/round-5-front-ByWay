import { MessageSquare } from "lucide-react";

export default function NoReviews() {
  return (
    <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-2xl p-8 shadow-sm text-center gap-3">
      <MessageSquare className="w-10 h-10 text-gray-400" />
      <h3 className="text-lg font-semibold text-gray-700">
        You don’t have any reviews yet
      </h3>
      <p className="text-sm text-gray-500 max-w-sm">
        Once learners start writing reviews and ratings, they will appear here 
      </p>
    </div>
  );
}
