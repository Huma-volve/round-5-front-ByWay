import Record from "@/components/AdminDashboard/payment & revenue/Record"
import { EARN_RECORDS } from "@/data/earns"
import { useTranslation } from "react-i18next";

function PaymentRevenue() {
    const { t } = useTranslation();
    return (
        <div >
            <h1 className="text-2xl font-medium text-primary mt-4 mb-2">{t("paymentRevenue.Payment & Revenue")}</h1>
            <p className="text-[14px] text-gray-500 ">
                {t("paymentRevenue.Track")}
            </p>
            <div className="flex  flex-wrap gap-2 items-center my-3 w-[100%]">
                <div className="h-24 w-[48%] lg:h-16 lg:w-40 flex flex-col gap-1 font-medium text-[16px] border-2 border-border   text-center p-2  rounded-[10px] ">
                    ${EARN_RECORDS.platform}
                    <span className="text-[13px] font-normal text-gray-700">{t("paymentRevenue.Platform Earnings")}</span>
                </div>
                <div className="h-24 w-[48%] lg:h-16 lg:w-40 flex flex-col gap-1 font-medium text-[16px] border-2 border-border text-center p-2  rounded-[10px] ">
                    ${EARN_RECORDS.instructor}
                    <span className="text-[13px] font-normal text-gray-700">{t("paymentRevenue.Instructor Earnings")}</span>
                </div>
                <div className="h-24 w-[48%] lg:h-16 lg:w-40 flex flex-col gap-1 font-medium text-[16px] border-2 border-border text-center p-2  rounded-[10px] ">
                    {EARN_RECORDS.total}
                    <span className="text-[13px] font-normal text-gray-700"> {t("paymentRevenue.Total Withdrow")}</span>
                </div>
                <div className="h-24 w-[48%] lg:h-16 lg:w-40 flex flex-col gap-1 font-medium text-[16px] border-2 border-border  text-center p-2  rounded-[10px] ">
                    ${EARN_RECORDS.student}
                    <span className="text-[13px] font-normal text-gray-700">{t("paymentRevenue.Student Payments")}</span>
                </div>
            </div>
            <Record />
        </div>
    )
}

export default PaymentRevenue
