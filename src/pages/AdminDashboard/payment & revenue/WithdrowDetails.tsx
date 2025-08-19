import { WITHDROWAL_DETAILS } from "@/data/paymentRecord"
import { useTranslation } from "react-i18next";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
interface PaymentDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
function WithdrowDetails({ open, onOpenChange }: PaymentDetailsProps) {
    const { t } = useTranslation();
    return (
 <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogContent className="w-[400px] bg-white p-6 rounded-lg shadow-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-primary mt-4 mb-2 text-center">
            WithDrowal  Details
          </DialogTitle>
        <div className="container my-4 mx-auto">

            <p className=" p-2 my-4 mt-8 rounded-[10px]">
                <span className="text-primary font-bold "> Instructor :</span> {WITHDROWAL_DETAILS.instructor}
            </p>
            <p className=" p-2 my-4 rounded-[10px]">
               <span className="text-primary font-bold ">
                Request Date : 
                </span> 
                {WITHDROWAL_DETAILS.date}
            </p>
            <p className="p-2 my-4 rounded-[10px]">
               <span className="text-primary font-bold ">  Amount : </span>${WITHDROWAL_DETAILS.amount}
            </p>
            <p className=" p-2 my-4 rounded-[10px]">
               <span className="text-primary font-bold ">  Method : </span>{WITHDROWAL_DETAILS.method}
            </p>
            <p className=" p-2 my-4 rounded-[10px]">
              <span className="text-primary font-bold ">  Bank Name :</span> {WITHDROWAL_DETAILS.bankName}
            </p>
            <p className="p-2 my-4 rounded-[10px]">
                <span className="text-primary font-bold "> Account Number :</span> {WITHDROWAL_DETAILS.accountNumber}
            </p>
            <p className=" p-2 my-4 rounded-[10px]">
            <span className="text-primary font-bold ">     Statue :</span>
                <span className={`
                  ${WITHDROWAL_DETAILS.status === "Pending"
                        ? "text-amber-500"
                        : WITHDROWAL_DETAILS.status === "Completed"
                            ? "text-green-600"
                            : "text-red-600"
                    } 
                  rounded-lg p-1 font-medium text-[14px]
                `}>
                    {WITHDROWAL_DETAILS.status}
                </span>
            </p>
        </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
    )
}

export default WithdrowDetails
