import useDeleteReview from "@/hooks/AdminDashboard/Reviews&Ratings/useDeleteReview";
import useViewReview from "@/hooks/AdminDashboard/Reviews&Ratings/useViewReview";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
interface DeleteReviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reviewId: number | null;
}

function DeleteReview({ open, onOpenChange, reviewId }: DeleteReviewProps) {
  const { t } = useTranslation();
  const { data: review } = useViewReview(
    reviewId !== null ? reviewId.toString() : null
  );
  const { mutate: deleteReview, status } = useDeleteReview();
  const isDeleting = status === "pending";
  const handleDelete = () => {
    if (reviewId === null) return;
    deleteReview(reviewId, {
      onSuccess: () => {
        onOpenChange(false);
        toast.success(t("adminReviews.Deleted successfully!"));
      },
      onError: () => {
        toast.error(t("adminReviews.Failed to delete"));
      },
    });
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold text-gray-800">
          {t("adminReviews.Confirm Delete")}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {t("adminReviews.Are you sure you want to delete")}{" "}
          <span className="font-medium">{review?.course_name}</span>?
        </p>

        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            {t("adminReviews.Cancel")}
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            {isDeleting ? t("deleteModal.deleting") : t("adminReviews.Delete")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteReview;
