import React from "react";
import { useTranslation } from "react-i18next";
interface DeleteReviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DeleteReview({ open, onOpenChange }: DeleteReviewProps) {
  const { t } = useTranslation();
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold text-gray-800">
          {t("adminReviews.Confirm Delete")}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {t("adminReviews.Are you sure you want to delete")}{" "}
          <span className="font-medium">ReviewName</span>?
        </p>

        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            {t("adminReviews.Cancel")}
          </button>
          <button className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">
            {t("adminReviews.Delete")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteReview;
