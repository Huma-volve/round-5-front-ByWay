import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (rating: number, comment: string) => void;
  isLoading?: boolean;
}

export default function FeedbackModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { t } = useTranslation();

  const handleStarClick = (starValue: number) => {
    setRating(starValue);
  };

  const handleConfirm = () => {
    onConfirm(rating, comment);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {t("feedbackModal.Give")}
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-2 justify-center my-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-8 w-8 cursor-pointer transition-colors ${
                star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
              onClick={() => handleStarClick(star)}
            />
          ))}
        </div>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("feedbackModal.What")}
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full resize-none border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={t("feedbackModal.Write")}
        />

        <DialogFooter className="mt-4 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="text-red-950 hover:text-white bg-gray-100 hover:bg-red-700 cursor-pointer"
          >
            {t("feedbackModal.Cancel")}
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={isLoading || rating === 0 || comment.trim() === ""}
            className="min-w-[100px] text-white hover:text-gray-100 bg-primary hover:bg-blue-950"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </div>
            ) : (
              t("feedbackModal.Confirm")
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
