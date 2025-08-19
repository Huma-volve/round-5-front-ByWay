import { TOTAL_COST } from "@/data/totalCost";
import { useState } from "react";
import { useTranslation } from "react-i18next";
const Payment = () => {
  const { t } = useTranslation();

 
  const [selected, setSelected] = useState<string>("");
  return (
    <div className="m-8">
      <h1 className="font-bold  ">
        {t("cart.Course")}: <span className="text-primary">
          Graphic Design
        </span>
      </h1>
      <h2 className="font-bold my-4 mx-4 text-[15px]">
        {t("cart.Price")}: <span className="text-success">
          {TOTAL_COST.total}
        </span>

      </h2>
      <h1 className="mt-8 text-secondaryDark font-bold">
        {t("cart.Choose your payment method")}:
      </h1>
      <div className="mt-5 flex flex-col  w-80">
        {/* Fawry */}
        <label
          className={`flex items-center gap-4  px-4 py-3 cursor-pointer transition 
           
            `}
        >
          <input
            type="checkbox"
            name="paymentMethod"
            value="fawry"
            checked={selected === "fawry"}
            onChange={() => setSelected("fawry")}
            className="w-5 h-5 accent-secondary cursor-pointer"
          />
          <div className="flex items-center gap-3">
            <h3 >Fawry</h3>
          </div>
        </label>

        {/* Wallet */}
        <label
          className={`flex items-center gap-4  px-4 py-3 cursor-pointer transition 
          `}
        >
          <input
            type="checkbox"
            name="paymentMethod"
            value="wallet"
            checked={selected === "wallet"}
            onChange={() => setSelected("wallet")}
            className="w-5 h-5 accent-secondary cursor-pointer"
          />
          <div className="flex items-center gap-3">
            <h3 >E-Wallet</h3>
          </div>
        </label>

        {/* Visa */}
        <label
          className={`flex items-center gap-4  px-4 py-3 cursor-pointer transition 
          `}
        >
          <input
            type="checkbox"
            name="paymentMethod"
            value="visa"
            checked={selected === "visa"}
            onChange={() => setSelected("visa")}
            className="w-5 h-5 accent-secondary cursor-pointer"
          />
          <div className="flex items-center gap-3">
            <h3 >
              Credit/Debit Card
            </h3>
          </div>
        </label>
      </div>
    </div>
  );
};
export default Payment;
