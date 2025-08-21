import { useTranslation } from "react-i18next";
import Breadcrumb from "../../components/common/Breadcrumb";
import { useBreadcrumb } from "../../hooks/useBreadcrumb";
import { usePaymentHistory } from "../../hooks/usePaymentHistory";

export default function PayHistoryPage() {
  const { t } = useTranslation();
  const { getAutoBreadcrumb } = useBreadcrumb();
  const { history, loading } = usePaymentHistory();

  return (
    <div className="bg-background w-full">
      <div className="m-4 mt-8">
        <Breadcrumb items={getAutoBreadcrumb()} className="mb-6 mt-5" />
      </div>

      <div className="w-[95%] md:w-[80%] mb-12 ml-2 md:ml-20 mr:8 md:mr-4 mt-8 overflow-x-auto">
        {loading && <p className="text-gray-500">{t("loading")}</p>}

        {!loading && history.length > 0 ? (
          <>
            {/* Desktop / Tablet */}
            <table className="hidden md:table w-full table-auto border-collapse border border-border rounded-lg">
              <thead className="border border-border">
                <tr className="text-left rtl:text-left text-sm text-primary">
                  <th className="px-4 py-2">{t("payments.Date")}</th>
                  <th className="px-4 py-2">{t("payments.Course")}</th>
                  <th className="px-4 py-2">{t("payments.Amount")}</th>
                  <th className="px-4 py-2">{t("payments.Method")}</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {history.map((his, index) =>
                  his.items.map((item) => (
                    <tr
                      key={`${his.created_at}-${item.course_id}-${index}`}
                      className="bg-white hover:bg-gray-50 transition-colors text-left rtl:text-right"
                    >
                      <td className="px-4 py-2 text-black text-sm">{his.created_at.slice(0,10)}</td>
                      <td className="px-4 py-2 text-success text-sm">{item.course_name}</td>
                      <td className="px-4 py-2 text-sm">{item.price} EGP</td>
                      <td className="px-4 py-2 text-secondaryDark">
                        {his.payment_method[0]?.brand} ({his.payment_method[0]?.masked})
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Mobile: Cards */}
            <div className="md:hidden flex flex-col gap-3">
              {history.map((his, index) =>
                his.items.map((item) => (
                  <div
                    key={`${his.created_at}-${item.course_id}-${index}`}
                    className="bg-white rounded-lg shadow-sm border border-border p-4"
                  >
                    <div className="flex justify-between mb-3">
                      <span className="font-semibold text-gray-800 text-sm">
                        {t("payments.Date")}:
                      </span>
                      <span className="text-gray-600 text-sm">{his.created_at}</span>
                    </div>
                    <div className="flex justify-between mb-3">
                      <span className="font-semibold text-gray-800 text-sm">
                        {t("payments.Course")}:
                      </span>
                      <span className="text-success text-sm">{item.course_name}</span>
                    </div>
                    <div className="flex justify-between mb-3">
                      <span className="font-semibold text-gray-800 text-sm">
                        {t("payments.Amount")}:
                      </span>
                      <span className="text-gray-700 text-sm">{item.price} EGP</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-gray-800">{t("payments.Method")}:</span>
                      <span className="text-secondaryDark text-sm">
                        {his.payment_method[0]?.brand} ({his.payment_method[0]?.masked})
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          !loading && <h1 className="text-center text-red-600">{t("payments.No payment history found")}</h1>
        )}
      </div>
    </div>
  );
}
