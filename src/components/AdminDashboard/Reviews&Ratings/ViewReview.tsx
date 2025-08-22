import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
interface ReviewsManagement {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reviewId: number | null;
}
import useViewReview from "@/hooks/AdminDashboard/Reviews&Ratings/useViewReview";
function ViewReview({ open, onOpenChange, reviewId }: ReviewsManagement) {
  const { t } = useTranslation();
  const { data: review } = useViewReview(reviewId !== null ? reviewId.toString() : null);
  if (!review) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogContent className="w-[400px] bg-white p-6 rounded-lg shadow-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-primary mt-4 mb-2 text-center">
            Reviews Details
          </DialogTitle>
          <div className="container my-4 mx-auto">
            <p className=" p-2 my-4 mt-8 rounded-[10px]">
              <span className="text-primary font-bold ">
                {t("adminReviews.course")} :
              </span>{" "}
              {review?.course_name}
            </p>
            <p className=" p-2 my-4 rounded-[10px]">
              <span className="text-primary font-bold">
                {t("adminReviews.reviewer")} :
              </span>
              {review?.reviewer}
            </p>
            <p className="p-2 my-4 rounded-[10px]">
              <span className="text-primary font-bold">
                {t("adminReviews.date")} :
              </span>
              {review?.date}
            </p>
            <p className=" p-2 my-4 rounded-[10px]">
              <span className="text-primary font-bold">
                {t("adminReviews.comment")} :
              </span>
              {review?.comment}
            </p>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ViewReview;
