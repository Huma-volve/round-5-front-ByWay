import { type paymentRecord } from "@/data/paymentRecord";
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
import { useFetchApproveWithdrawal, useFetchPaymentRecords, useFetchRejectWithdrawal } from "@/hooks/AdminDashboard/useFetchPaymentRevenue";

import { toast } from "sonner";

function Record() {
  const [openDialog, setOpenDialog] = useState(false); // PaymentDetails
  const [openDialogW, setOpenDialogW] = useState(false); // WithdrowDetails
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(2);
  const { data, isLoading } = useFetchPaymentRecords(currentPage);
  const records = data?.data?.data || [];
  const [id, setId] = useState<string>(records[0]?.id);
  // const [idW, /*setIdW*/] = useState<string>(records[0]?.id);
  const approvemutation = useFetchApproveWithdrawal();
  const totalPages = data?.data?.last_page ;
  console.log(data?.data.last_page);
  
  useEffect(() => {
    if (!openDialog && !openDialogW) {
      const timer = setTimeout(() => {
        setOpenDropdowns({});
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [openDialog, openDialogW]);

  const rejectMutation = useFetchRejectWithdrawal();
  if (isLoading) return   <div className="w-full mt-8 mb-12 overflow-x-auto rounded-lg shadow-sm border border-gray-200">
          <div className="min-w-[700px]">
            <div className="flex bg-gray-100 p-4 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex-1 h-6 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>        
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex p-4 border-b border-gray-200 gap-4">
                {[...Array(6)].map((_, j) => (
                  <div key={j} className="flex-1 h-5 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            ))}
          </div>
        </div>


  return (
    <div className="w-full mt-8 mb-12 overflow-x-auto text-[13px] text-center my-8 rounded-lg bg-[#F9FAFC] py-4 pl-2">
      <table className=" w-full min-w-[700px] table-auto border-collapse rounded-lg">
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
          {records.map((record: paymentRecord) => (
            <tr key={record.id} className="text-gray-500 relative">
              <td>{record.date}</td>
              <td>{record.user_name}</td>
              <td>{record.type}</td>
              <td>${record.amount}</td>
              <td
                className={`
                  ${record.status === "pending"
                    ? "text-amber-500"
                    : record.status === "succeeded"
                      ? "text-green-600"
                      : "text-red-600"
                  } 
                  rounded-lg p-1 font-medium text-[12px]
                `}
              >
                {record.status}
              </td>
              <td>{record.payment_method}</td>
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
                          setId(record.id?.toString() || "");
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
                        onClick={() => {
                          // e.preventDefault();
                          if (record.status !== "pending") {
                            console.log("pending", record.status);
                            toast.error(t("Withdrawal request must be pending to approve"));
                            return;
                          }
                          // setIdW(record.id?.toString() || "");
                          approvemutation.mutate({ id: Number(record.id) });
                          console.log(approvemutation);
                          toast.success(t("Withdrawal request approved successfully"));
                          // setOpenDropdowns((prev) => ({
                          //   ...prev,
                          //   [record.id?.toString() || "0"]: false,
                          // }));
                          // setTimeout(() => setOpenDialogW(true), 50);
                        }}
                      >
                        <button className="drop-item text-success outline-none w-full text-left">
                          {t("paymentRevenue.approve withdrawal")}
                        </button>
                      </DropdownMenuItem>

                      {/* Reject Request */}
                      <DropdownMenuItem asChild>
                        <button
                          onClick={() => {
                            if (record.status !== "pending") {
                              toast.error(t("Withdrawal request must be pending to reject"));
                              return;
                            }
                            rejectMutation.mutate({ id: Number(record.id) });
                          }}
                          className="drop-item text-red-600 outline-none"
                        >
                          {t("paymentRevenue.reject request")}
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenuPortal>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-4">
          {currentPage} {data?.current_page} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <PaymentDetails id={id} open={openDialog} onOpenChange={setOpenDialog} />
      <WithdrowDetails /*id={idW}*/ open={openDialogW} onOpenChange={setOpenDialogW} />
    </div>
  );
}

export default Record;
