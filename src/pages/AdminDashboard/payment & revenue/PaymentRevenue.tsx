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
            <div className="flex flex-wrap gap-4 items-center my-8">
                <div className="flex flex-col gap-2 font-medium text-[16px] border-2 border-border  text-center py-2 px-4 rounded-[10px] ">
                    ${EARN_RECORDS.platform}
                    <span className="text-[14px] font-normal text-gray-700">{t("paymentRevenue.Platform Earnings")}</span>
                </div>
                <div className="flex flex-col gap-2 font-medium text-[16px] border-2 border-border text-center py-2 px-4 rounded-[10px] ">
                    ${EARN_RECORDS.instructor}
                    <span className="text-[14px] font-normal text-gray-700">{t("paymentRevenue.Instructor Earnings")}</span>
                </div>
                <div className="flex flex-col gap-2 font-medium text-[16px] border-2 border-border text-center py-2 px-4 rounded-[10px] ">
                    {EARN_RECORDS.total}
                    <span className="text-[14px] font-normal text-gray-700"> {t("paymentRevenue.Total Withdrow")}</span>
                </div>
                <div className="flex flex-col gap-2 font-medium text-[16px] border-2 border-border  text-center py-2 px-4 rounded-[10px] ">
                    ${EARN_RECORDS.student}
                    <span className="text-[14px] font-normal text-gray-700">{t("paymentRevenue.Student Payments")}</span>
                </div>
            </div>
            <Record />
        </div>
    )
}

export default PaymentRevenue
