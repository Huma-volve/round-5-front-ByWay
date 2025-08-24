
import { PAYMENT_DETAILS } from "@/data/paymentRecord"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useTranslation } from "react-i18next";
interface PaymentDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
function PaymentDetails({ open, onOpenChange }: PaymentDetailsProps) {
  const {t}=useTranslation();
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogContent className="w-[350px] bg-white p-6 rounded-lg shadow-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-primary mt-4 mb-2 text-center">
            {t("adminDetails.Payment Details")}
          </DialogTitle>
          <div className="">
            <p className="py-2 px-4 my-4 mt-8 rounded-[10px]">
              <span className="text-primary font-bold ">  {t("adminDetails.Student")} :</span> {PAYMENT_DETAILS.student}
            </p>
            <p className=" py-2 px-4 my-4 rounded-[10px]">
              <span className="text-primary font-bold ">  {t("adminDetails.Payment Date")} :</span> {PAYMENT_DETAILS.date}
            </p>
            <p className=" py-2 px-4 my-4 rounded-[10px]">
              <span className="text-primary font-bold ">   {t("adminDetails.Course")} :</span> {PAYMENT_DETAILS.course}
            </p>
            <p className=" py-2 px-4 my-4 rounded-[10px]">
              <span className="text-primary font-bold ">   {t("adminDetails.Method")} : </span>{PAYMENT_DETAILS.method}
            </p>
            <p className=" py-2 px-4 my-4 rounded-[10px]">
              <span className="text-primary font-bold ">    {t("adminDetails.Amount")} :</span> ${PAYMENT_DETAILS.amount}
            </p>
            <p className=" py-2 px-4 my-4 rounded-[10px]">
              <span className="text-primary font-bold ">   {t("adminDetails.Statue")} :</span>
              <span className={`
                  ${PAYMENT_DETAILS.status === "Pending"
                  ? "text-amber-500"
                  : PAYMENT_DETAILS.status === "Completed"
                    ? "text-green-600"
                    : "text-red-600"
                } 
                  rounded-lg p-1 font-medium text-[14px]
                `}>
                {PAYMENT_DETAILS.status}
              </span>
            </p>
          </div>

        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentDetails
