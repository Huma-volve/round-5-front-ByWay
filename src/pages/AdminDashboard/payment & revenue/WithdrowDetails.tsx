import { WITHDROWAL_DETAILS } from "@/data/paymentRecord"
import { useTranslation } from "react-i18next";


function WithdrowDetails() {
    const { t } = useTranslation();
    return (
 
        <div className="container my-4 mx-auto">

            <h1 className="text-xl font-medium text-primary mt-4 mb-2"> WithDrowal  Details </h1>

            <p className="w-48 shadow-md py-2 px-4 my-4 mt-8 rounded-[10px]">
                <span className="text-primary font-bold "> Instructor :</span> {WITHDROWAL_DETAILS.instructor}
            </p>
            <p className="w-60 shadow-md py-2 px-4 my-4 rounded-[10px]">
                Request Date : {WITHDROWAL_DETAILS.date}
            </p>
            <p className="w-40 shadow-md py-2 px-4 my-4 rounded-[10px]">
               <span className="text-primary font-bold ">  Amount : </span>${WITHDROWAL_DETAILS.amount}
            </p>
            <p className="w-60 shadow-md py-2 px-4 my-4 rounded-[10px]">
               <span className="text-primary font-bold ">  Method : </span>{WITHDROWAL_DETAILS.method}
            </p>
            <p className="w-40 shadow-md py-2 px-4 my-4 rounded-[10px]">
              <span className="text-primary font-bold ">  Bank Name :</span> {WITHDROWAL_DETAILS.bankName}
            </p>
            <p className="w-64 shadow-md py-2 px-4 my-4 rounded-[10px]">
                <span className="text-primary font-bold "> Account Number :</span> {WITHDROWAL_DETAILS.accountNumber}
            </p>
            <p className="w-40 shadow-md py-2 px-4 my-4 rounded-[10px]">
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
  
    )
}

export default WithdrowDetails
