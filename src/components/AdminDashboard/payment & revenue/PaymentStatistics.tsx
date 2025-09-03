
import { useFetchPaymentStatistics } from "@/hooks/AdminDashboard/useFetchPaymentRevenue";
import { currencyFormatter } from "@/utils/CurrencyFormatter";
import { useTranslation } from "react-i18next";

function PaymentStatistics() {
    const { t } = useTranslation();
    const { data, isPending, isError, error } = useFetchPaymentStatistics()
    const statistics = data?.data || [];
    let content
    if (isPending) {
        content = (
            <div className="my-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">

                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-20 bg-gray-200 animate-pulse rounded-lg"
                        ></div>
                    ))}
                </div>
            </div>
        )
    }
    if (isError) {
        content = (
            <div className="my-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">
                    {error?.message || "Failed to load statistics."}
                </p>
            </div>
        )
    }
    if (statistics.length !== 0) {
        content = (
            <div >
                <h1 className="text-2xl font-medium text-primary mt-4 mb-2">{t("paymentRevenue.Payment & Revenue")}</h1>
                <p className="text-[14px] text-gray-500 ">
                    {t("paymentRevenue.Track")}
                </p>
                <div className="flex  flex-wrap gap-2 items-center my-3 w-[100%] text-success">
                    <div className="h-24 w-[48%] md:h-16 lg:w-40 flex flex-col my-auto gap-1 font-medium text-[16px] border-2 border-border   text-center p-2  rounded-[10px] ">
                        {currencyFormatter.format(statistics["platform_earnings"])}
                        <span className="text-[13px] font-normal text-gray-700">{t("paymentRevenue.Platform Earnings")}</span>
                    </div>
                    <div className="h-24 w-[48%] md:h-16 lg:w-40 flex flex-col gap-1 font-medium text-[16px] border-2 border-border text-center p-2  rounded-[10px] ">
                        {currencyFormatter.format(statistics["instructor_earnings"])}
                        <span className="text-[13px] font-normal text-gray-700">{t("paymentRevenue.Instructor Earnings")}</span>
                    </div>
                    <div className="h-24 w-[48%] md:h-16 lg:w-40 flex flex-col gap-1 font-medium text-[16px] border-2 border-border text-center p-2  rounded-[10px] ">
                        {currencyFormatter.format(statistics["total_withdrawals"])}
                        <span className="text-[13px] font-normal text-gray-700"> {t("paymentRevenue.Total Withdrow")}</span>
                    </div>
                    <div className="h-24 w-[48%] md:h-16 lg:w-40 flex flex-col gap-1 font-medium text-[16px] border-2 border-border  text-center p-2  rounded-[10px] ">
                        {currencyFormatter.format(statistics["student_payments"])}
                        <span className="text-[13px] font-normal text-gray-700">{t("paymentRevenue.Student Payments")}</span>
                    </div>
                </div>
            </div>
        )
    }
    return content
}

export default PaymentStatistics
