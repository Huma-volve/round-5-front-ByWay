import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
interface Errors {
  paymentMethod?: string;
  bankName?: string;
  amount?: string;
  accountValue?: string;
}

export default function GetPaid() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [account, setAccount] = useState<string>("");
  const [accountValue, setAccountValue] = useState<string>("");
  const [saveDetails, setSaveDetails] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!paymentMethod) {
      newErrors.paymentMethod = t("withdraw.Please select a payment method");
    }
    if (paymentMethod === "bank" && !bankName) {
      newErrors.bankName = t("withdraw.Please select a bank");
    }
    if (!account || account.length <= 0) {
      newErrors.amount = t("withdraw.Please enter a valid account Name");
    }
    if (!accountValue) {
      newErrors.accountValue =
        paymentMethod === "bank"
          ? t("withdraw.Please enter your account number")
          : t("withdraw.Please enter your account email");
    } else {
      if (paymentMethod === "bank" && accountValue.length < 6) {
        newErrors.accountValue = t("withdraw.Account number must be at least 6 digits");
      }
      if (paymentMethod !== "bank" && !/\S+@\S+\.\S+/.test(accountValue)) {
        newErrors.accountValue = t("withdraw.Please enter a valid email");
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (validate()) {
      navigate("/instructor/withdraw");
    }
  };

  return (
    <div className="container my-6 mx-auto mt-12 bg-background">
      <h1 className="text-2xl font-bold mb-6">{t("withdraw.Enter Payment Details")}</h1>

      {/* Payment Method */}
      <label className="block font-medium mb-2">{t("withdraw.Payment Method")}</label>
      <select
        value={paymentMethod}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setPaymentMethod(e.target.value)
        }
        className="w-full lg:w-[50%] border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">{t("withdraw.Please Select")}</option>
        <option value="paypal">{t("withdraw.PayPal")}</option>
        <option value="bank">{t("withdraw.Bank Transfer")}</option>
        <option value="fawry">{t("withdraw.Fawry")}</option>
      </select>
      {errors.paymentMethod && (
        <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>
      )}

      {/* Acount */}
      <div className="mt-4">
        <label className="block font-medium mb-2">{t("withdraw.Account Name")}</label>
        <input
          type="text"
          value={account}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAccount(e.target.value)
          }
          className="w-full lg:w-[50%] border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={t("withdraw.Enter Account Name")}
        />
        {errors.amount && (
          <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
        )}
      </div>

      {/* Account Email / Number */}
      <div className="mt-4">
        <label className="block font-medium mb-2">
          {paymentMethod === "bank" ? t("withdraw.Account Number") : t("withdraw.Account Email")}
        </label>
        <input
          type={paymentMethod === "bank" ? "number" : "email"}
          value={accountValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAccountValue(e.target.value)
          }
          className="w-full lg:w-[50%] border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={
            paymentMethod === "bank"
              ? t("withdraw.Enter Account Number")
              : t("withdraw.Enter Account Email")
          }
        />
        {errors.accountValue && (
          <p className="text-red-500 text-sm mt-1">{errors.accountValue}</p>
        )}
      </div>
{/* Bank Select */}
      {paymentMethod === "bank" && (
        <div className="mt-4 transition-all duration-300 ease-in-out">
          <label className="block font-medium mb-2">{t("withdraw.Bank Name")}</label>
          <select
            value={bankName}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setBankName(e.target.value)
            }
            className="w-full lg:w-[50%] border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">{t("withdraw.Please Select")}</option>
            <option value="cib">CIB</option>
            <option value="alahly">Al-Ahly</option>
            <option value="egypt">Bank of Egypt</option>
          </select>
          {errors.bankName && (
            <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>
          )}
        </div>
      )}

      {/* Save details */}
      <div className="mt-4 flex items-center">
        <input
          type="radio"
          id="saveDetails"
          checked={saveDetails}
          onChange={() => setSaveDetails(!saveDetails)}
          className="mr-2"
        />
        <label htmlFor="saveDetails" className="cursor-pointer text-secondaryDark">
          {t("withdraw.Save These Details")}
        </label>
      </div>

      {/* Confirm Button */}
      <button
        className="mt-6 w-full lg:w-[50%] bg-success text-white py-2 rounded-lg hover:bg-green-700 transition"
        onClick={handleConfirm}
      >
        {t("withdraw.Continue")}
      </button>
    </div>
  );
}
