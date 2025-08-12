import { useTranslation } from "react-i18next";
import Breadcrumb from "../../components/common/Breadcrumb";
import { useBreadcrumb } from "../../hooks/useBreadcrumb";
import { HISTORY_DETAILES, type HistoryItem } from "../../data/PaymentHistoryDetailes";

export default function PayHistoryPage() {
  const { t } = useTranslation();
  const { getAutoBreadcrumb } = useBreadcrumb();


  return (
    <div className="bg-background">
      <div className="m-4 mt-8">
        <Breadcrumb items={getAutoBreadcrumb()} className="mb-6 mt-5" />
      </div>

      <div className="w-[95%] md:w-[80%] ml-2 md:ml-12 mr:8 md:mr-4 mt-8 overflow-x-auto">
        {/* Desktop / Tablet */}
        <table className="hidden md:table w-full table-auto border-collapse border border-border rounded-lg">
          <thead className="border border-border">
            <tr className="text-left text-sm text-primary">
              <th className="px-4 py-2">{t("payments.Date")}</th>
              <th className="px-4 py-2">{t("payments.Course")}</th>
              <th className="px-4 py-2">{t("payments.Amount")}</th>
              <th className="px-4 py-2">{t("payments.Method")}</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {HISTORY_DETAILES.map((his : HistoryItem) => (
              <tr key={his.id} className="bg-white hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2 text-black text-sm">{his.date}</td>
                <td className="px-4 py-2 text-success text-sm">{his.course}</td>
                <td className="px-4 py-2 text-sm">{his.amount} EGP</td>
                <td className="px-4 py-2 text-secondaryDark">{his.method}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile: Cards */}
        <div className="md:hidden flex flex-col gap-3">
          {HISTORY_DETAILES.map((his : HistoryItem) => (
            <div
              key={his.id}
              className="bg-white rounded-lg shadow-sm border border-border p-4"
            >
              <div className="flex justify-between mb-3">
                <span className="font-semibold text-gray-800 text-sm">{t("payments.Date")}:</span>
                <span className="text-gray-600 text-sm">{his.date}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="font-semibold text-gray-800 text-sm">{t("payments.Course")}:</span>
                <span className="text-success text-sm">{his.course}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="font-semibold text-gray-800 text-sm">{t("payments.Amount")}:</span>
                <span className="text-gray-700 text-sm">{his.amount} EGP</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-gray-800">{t("payments.Method")}:</span>
                <span className="text-secondaryDark text-sm">{his.method}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
