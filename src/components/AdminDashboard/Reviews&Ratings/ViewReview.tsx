import { WITHDROWAL_DETAILS } from "@/data/paymentRecord";
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
}
import { fakeReviews } from "@/data/AdminDashboard/ReviewsManagement";
function ViewReview({ open, onOpenChange }: ReviewsManagement) {
  const { t } = useTranslation();
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
              {fakeReviews[0].courseName}
            </p>
            <p className=" p-2 my-4 rounded-[10px]">
              <span className="text-primary font-bold">
                {t("adminReviews.reviewer")} :
              </span>
              {fakeReviews[0].reviewer}
            </p>
            <p className="p-2 my-4 rounded-[10px]">
              <span className="text-primary font-bold">
                {t("adminReviews.date")} :
              </span>
              {fakeReviews[0].date}
            </p>
            <p className=" p-2 my-4 rounded-[10px]">
              <span className="text-primary font-bold">
                {t("adminReviews.comment")} :
              </span>
              {fakeReviews[0].commentPreview}
            </p>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ViewReview;
