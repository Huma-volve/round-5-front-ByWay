import { PAYMENT_RECORDS } from "@/data/paymentRecord";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from "@radix-ui/react-dropdown-menu";
import { useTranslation } from "react-i18next";
import { MoreVertical } from "lucide-react";
import { useState, useEffect } from "react";
import PaymentDetails from "@/pages/AdminDashboard/payment & revenue/PaymentDetails";
import WithdrowDetails from "@/pages/AdminDashboard/payment & revenue/WithdrowDetails";

function Record() {
  const [openDialog, setOpenDialog] = useState(false); // PaymentDetails
  const [openDialogW, setOpenDialogW] = useState(false); // WithdrowDetails
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
  const { t } = useTranslation();

  // لما أقفل أي Dialog يتقفل الـ dropdown
  useEffect(() => {
    if (!openDialog && !openDialogW) {
      const timer = setTimeout(() => {
        setOpenDropdowns({});
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [openDialog, openDialogW]);

  return (
    <div className="w-[100%] text-[13px] text-center my-8 rounded-lg bg-[#F9FAFC] py-4 pl-2">
      <table className="w-full border-collapse rounded-lg overflow-hidden ">
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
              <td>${record.amount}</td>
              <td
                className={`
                  ${
                    record.status === "Pending"
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
                <DropdownMenu
                  open={openDropdowns[record.id?.toString() || "0"]}
                  onOpenChange={(open) =>
                    setOpenDropdowns((prev) => ({
                      ...prev,
                      [record.id?.toString() || "0"]: open,
                    }))
                  }
                  modal={false}
                >
                  <DropdownMenuTrigger asChild>
                    <button className="px-2 py-1 m-2 outline-none ">
                      <MoreVertical className="h-4 w-4 hover:text-primary" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuPortal>
                    <DropdownMenuContent
                      className="mt-1 p-1 bg-white outline-none rounded shadow-lg z-[9999] w-[250px]"
                      align="end"
                      side="bottom"
                      sideOffset={8}
                    >
                      <DropdownMenuArrow className="fill-white drop-shadow-sm" />

                      {/* View Details */}
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenDropdowns((prev) => ({
                            ...prev,
                            [record.id?.toString() || "0"]: false,
                          }));
                          setTimeout(() => setOpenDialog(true), 50);
                        }}
                      >
                        <button className="drop-item outline-none w-full text-left">
                          {t("paymentRevenue.View Details")}
                        </button>
                      </DropdownMenuItem>

                      {/* Approve Withdrawal */}
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenDropdowns((prev) => ({
                            ...prev,
                            [record.id?.toString() || "0"]: false,
                          }));
                          setTimeout(() => setOpenDialogW(true), 50);
                        }}
                      >
                        <button className="drop-item outline-none w-full text-left">
                          {t("paymentRevenue.approve withdrawal")}
                        </button>
                      </DropdownMenuItem>

                      {/* Reject Request */}
                      <DropdownMenuItem asChild>
                        <Link
                          to="/"
                          className="drop-item text-red-600 outline-none"
                        >
                          {t("paymentRevenue.reject request")}
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenuPortal>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialogs */}
      <PaymentDetails open={openDialog} onOpenChange={setOpenDialog} />
      <WithdrowDetails open={openDialogW} onOpenChange={setOpenDialogW} />
    </div>
  );
}

export default Record;
