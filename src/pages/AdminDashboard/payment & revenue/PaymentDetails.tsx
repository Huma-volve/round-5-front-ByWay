
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useTranslation } from "react-i18next";
import { useFetchPaymentRecordDetails } from "@/hooks/AdminDashboard/useFetchPaymentRevenue";
import type { paymentDetails } from "@/data/paymentRecord";
import LoadingDesign from "@/components/AdminDashboard/UserManagement/LoadingDesign";

interface PaymentDetailsProps {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function PaymentDetails({ id ,open, onOpenChange }: PaymentDetailsProps) {
  const {t}=useTranslation();
  const {data,isLoading} = useFetchPaymentRecordDetails(parseInt(id));
 const details:paymentDetails | undefined = data?.data;


 
 return (
   <Dialog open={open} onOpenChange={onOpenChange} modal={true}>

      { (isLoading)?(<LoadingDesign />)
    : ( <DialogContent className="w-[350px] bg-white p-6 rounded-lg shadow-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-primary mt-4 mb-2 text-center">
            {t("adminDetails.Payment Details")}
          </DialogTitle>
          <div className="">
            {details?.instructor && <p className="py-2 px-4 my-4 mt-8 rounded-[10px]">
              <span className="text-primary font-bold ">  {t("adminDetails.instructor")} :</span> {details?.instructor}
            </p>}
          {details?.student &&  <p className="py-2 px-4 my-4 mt-8 rounded-[10px]">
              <span className="text-primary font-bold ">  {t("adminDetails.Student")} :</span> {details?.student}
            </p>}
            <p className=" py-2 px-4 my-4 rounded-[10px]">
              <span className="text-primary font-bold ">  {t("adminDetails.Payment Date")} :</span> {details?.request_date || details?.payment_date}
            </p>
            <p className=" py-2 px-4 my-4 rounded-[10px]">
              <span className="text-primary font-bold ">   {t("adminDetails.Course")} :</span> {details?.course ||"unknown"}
            </p>
            <p className=" py-2 px-4 my-4 rounded-[10px]">
              <span className="text-primary font-bold ">   {t("adminDetails.Method")} : </span>{details?.method ||"unknown"}
            </p>
            <p className=" py-2 px-4 my-4 rounded-[10px]">
              <span className="text-primary font-bold ">    {t("adminDetails.Amount")} :</span> ${details?.amount}
            </p>
            <p className=" py-2 px-4 my-4 rounded-[10px]">
              <span className="text-primary font-bold ">   {t("adminDetails.Statue")} :</span>
              <span className={`
                  ${details?.status === "pending"
                  ? "text-amber-500"
                  : details?.status === "succeeded"
                    ? "text-green-600"
                    : "text-red-600"
                } 
                  rounded-lg p-1 font-medium text-[14px]
                `}>
                {details?.status}
              </span>
            </p>
          </div>

        </DialogHeader>
      </DialogContent> )
      }
    </Dialog>
  )
}

export default PaymentDetails;
export type { PaymentDetailsProps };
