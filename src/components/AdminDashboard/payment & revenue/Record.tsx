
import { PAYMENT_RECORDS } from "@/data/paymentRecord";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuArrow, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useTranslation } from "react-i18next";
import { MoreVertical } from "lucide-react"
import { useState } from "react";
import PaymentDetails from "@/pages/AdminDashboard/payment & revenue/PaymentDetails";
function Record() {
    const [openDialog, setOpenDialog] = useState(false);
    const { t } = useTranslation();
    return (
        <div className="w-[100%] md:w-[80%] text-[13px] text-center my-8 rounded-lg bg-[#F9FAFC] py-4 pl-2">
            <table className="w-full border-collapse rounded-lg overflow-hidden">
                <thead>
                    <tr className="text-primary text-[14px] font-semibold">
                        <th>{t("paymentRevenue.Date")}</th>
                        <th>{t("paymentRevenue.user name")}</th>
                        <th>{t("paymentRevenue.Type")}</th>
                        <th>{t("paymentRevenue.Amount")}</th>
                        <th>{t("paymentRevenue.Status")}</th>
                        <th>{t("paymentRevenue.Method")}</th>
                        <th>{t("paymentRevenue.Action")}</th>
                    </tr>
                </thead>
                <tbody>
                    {PAYMENT_RECORDS.map((record) => (
                        <tr key={record.id} className="text-gray-500 relative">
                            <td>{record.date}</td>
                            <td>{record.name}</td>
                            <td>{record.type}</td>
                            <td >${record.amount}</td>
                            <td
                                className={`
                  ${record.status === "Pending"
                                        ? "text-amber-500"
                                        : record.status === "Completed"
                                            ? "text-green-600"
                                            : "text-red-600"
                                    } 
                  rounded-lg p-1 font-medium text-[12px]
                `}
                            >
                                {record.status}
                            </td>
                            <td>{record.method}</td>
                            <td className="relative">


                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="px-2 py-1 m-2 outline-none ">
                                            <MoreVertical className="h-4 w-4 hover:text-primary" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="mt-1 p-1 bg-white rounded shadow-lg "
                                        align="end"
                                        side="bottom"
                                        sideOffset={8}
                                    >
                                        <DropdownMenuArrow className="fill-white drop-shadow-sm " />
                                        <DropdownMenuItem asChild onClick={() => setOpenDialog(true)}>
                                            <button className="drop-item outline-none" >
                                                {t("paymentRevenue.View Details")}
                                            </button>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link className="drop-item text-success outline-none" to="/admin/withdraw-details">
                                                {t("paymentRevenue.approve withdrawal")}
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link
                                                to="/"
                                                className="drop-item text-red-600 outline-none"
                                            >
                                                {t("paymentRevenue.reject request")}
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <PaymentDetails open={openDialog} onOpenChange={setOpenDialog} />
        </div>
    );
}

export default Record;
