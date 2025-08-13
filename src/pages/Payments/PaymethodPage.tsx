import { useTranslation } from "react-i18next";
import Breadcrumb from "../../components/common/Breadcrumb";
import { useBreadcrumb } from "../../hooks/useBreadcrumb";
import fawry from "../../assets/images/icons/payment-fawry.png";
import wallet from "../../assets/images/icons/payment-wallet.png";
import visa from "../../assets/images/icons/payment-visa.png";
import { useState } from "react";

export default function PaymethodPage() {
  const { t } = useTranslation();
  const { getAutoBreadcrumb } = useBreadcrumb();

  const [selected, setSelected] = useState<string>("");

  return (
    <div className="bg-background min-h-screen">
      <div className="m-4 mt-8">
        <Breadcrumb items={getAutoBreadcrumb()} className="mb-6 mt-5" />
      </div>

      {/* Payment Methods */}
      <div className="mt-16 flex flex-col w-full sm:w-[80%] md:w-[60%] lg:w-[50%] m-auto px-4">
        {/* header */}
        <div className="flex flex-col gap-1">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold">
            {t("payments.Choose your payment method")}:
          </h2>
          <h3 className="text-xs md:text-base text-secondaryDark">
            {t("payments.Select your preferred way to pay for your courses")}.
          </h3>
        </div>

        {/* ways */}
        <div className="mt-10 flex flex-col gap-4">
          {/* Fawry */}
          <label className={`flex items-center gap-4 border border-border rounded-lg px-4 py-3 cursor-pointer transition 
            ${selected === "fawry" ? "bg-gray-100 border-secondary" : "bg-white hover:bg-gray-50"}`}>
            <input
              type="checkbox"
              name="paymentMethod"
              value="fawry"
              checked={selected === "fawry"}
              onChange={() => setSelected("fawry")}
              className="w-5 h-5 accent-secondary cursor-pointer"
            />
            <div className="flex items-center gap-3">
              <img src={fawry} alt="fawry icon" className="w-10 h-10 object-contain" />
              <h3 className="text-base sm:text-lg font-medium">Fawry</h3>
            </div>
          </label>

          {/* Wallet */}
          <label className={`flex items-center gap-4 border border-border rounded-lg px-4 py-3 cursor-pointer transition 
            ${selected === "wallet" ? "bg-gray-100 border-secondary" : "bg-white hover:bg-gray-50"}`}>
            <input
              type="checkbox"
              name="paymentMethod"
              value="wallet"
              checked={selected === "wallet"}
              onChange={() => setSelected("wallet")}
              className="w-5 h-5 accent-secondary cursor-pointer"
            />
            <div className="flex items-center gap-3">
              <img src={wallet} alt="E-Wallet icon" className="w-10 h-10 object-contain" />
              <h3 className="text-base sm:text-lg font-medium">E-Wallet</h3>
            </div>
          </label>

          {/* Visa */}
          <label className={`flex items-center gap-4 border border-border rounded-lg px-4 py-3 cursor-pointer transition 
            ${selected === "visa" ? "bg-gray-100 border-secondary" : "bg-white hover:bg-gray-50"}`}>
            <input
              type="checkbox"
              name="paymentMethod"
              value="visa"
              checked={selected === "visa"}
              onChange={() => setSelected("visa")}
              className="w-5 h-5 accent-secondary cursor-pointer"
            />
            <div className="flex items-center gap-3">
              <img src={visa} alt="Credit/Debit Card icon" className="w-10 h-10 object-contain" />
              <h3 className="text-base sm:text-lg font-medium">Credit/Debit Card</h3>
            </div>
          </label>
        </div>
        <button className="mt-14 px-2 py-3 bg-success text-white rounded-md w-[200px] md:w-[300px] hover:bg-green-600 transition-all duration-300">Save Payment Method</button>
      </div>
    </div>
  );
}
