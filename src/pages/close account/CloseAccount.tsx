import { fetchCloseAccount, fetchCloseAccountStatus } from "@/hooks/learner-profile";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { toast } from "react-toastify";

const CloseAccount = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const closeAccountMutation = fetchCloseAccount();
  const {data:statusData} = fetchCloseAccountStatus();
  console.log("Account status data:", statusData?.data);
// const closureDate = new Date(statusData?.data?.data?.closure_date); 
// const now = new Date();
// const diff = closureDate.getTime() - now.getTime();
  const handleCloseAccount = () => {
    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    closeAccountMutation.mutate(password, {
      onSuccess: (res) => {
        toast.success(res.message || "Account closed successfully");
      },
      onError: (err: unknown) => {
        interface ErrorResponse {
          response?: {
            data?: {
              message?: string;
            };
          };
        }
        const error = err as ErrorResponse;
        const errorMessage = error.response?.data?.message || "Error closing account";
        toast.error(errorMessage);
      },
    });
  };

  
  if (closeAccountMutation.status === "success" || statusData?.data?.data?.status==="pending_closure") {
    return (
      <div className="w-[100%] lg:w-[50%] h-[60dvh] flex flex-col items-center justify-center mx-auto text-center">
        <p className="text-secondary font-400">
          Account closure requested.closed within 14 day.
        </p>
      </div>
    );
  }

  return (
    <div className="w-[100%] lg:w-[50%] h-[100dvh] flex flex-col items-center justify-center mx-auto text-center">
      <h1 className="font-bold text-[30px]">{t("closeAccount.Close Account")}</h1>
      <p className="text-secondaryDark font-400">
        {t("closeAccount.Close your account permanently.")}
      </p>

      <h4 className="font-medium m-4 lg:text-[17px]">
        <span className="text-danger text-[24px] pr-2">{t("closeAccount.Warning")}:</span>
        {t("closeAccount.warning1")}
      </h4>

      <h4 className="font-medium lg:text-[17px] w-[80%] mx-auto my-4">
        {t("closeAccount.warning2")}
      </h4>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t("closeAccount.Enter your password")}
        className="border border-gray-300 rounded-md px-4 py-2 my-4 w-[80%]"
      />

      <button
        onClick={handleCloseAccount}
        disabled={closeAccountMutation.status === "pending"}
        className="bg-danger text-white px-6 py-2 rounded-md font-bold hover:opacity-[.8] transition-colors duration-300"
      >
        {closeAccountMutation.status === "pending" ? t("Processing...") : t("confirm")}
      </button>
    </div>
  );
};

export default CloseAccount;
