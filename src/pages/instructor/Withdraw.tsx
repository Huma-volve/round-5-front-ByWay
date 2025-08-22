import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Withdraw() {
  const { t } = useTranslation();
  const [withdraw, setWithdraw] = useState<number>(0);
  const [isValid, setIsValid] = useState<boolean>(true);
  const navigate = useNavigate();
  function handleClick() {
    if (withdraw < 40.34 || withdraw > 44.34) {
      setIsValid(false);
    } else {
      setIsValid(true);
      navigate("/instructor/revenue");
    }
  }

  return (
    <div className="container my-6 mx-auto mt-12 bg-background">
      {/* header */}
      <h1 className="text-2xl font-bold mb-6">
        {t("withdraw.Withdraw Amount")}
      </h1>
      {/* body */}
      <div className="w-full md:w-[40%] flex flex-col items-start">
        {/* details */}
        <div className="mt-3 flex flex-col gap-3">
          <p className="md:text-lg">
            {t("withdraw.Available Balance")}:{" "}
            <span className="font-bold text-success">+ $44,340</span>
          </p>
          <p className="md:text-lg">
            {t("withdraw.Minimum Withdrawal")}:{" "}
            <span className="font-bold text-secondaryDark">$40,340</span>
          </p>
        </div>
        {/* input */}
        <div className="mt-8 flex flex-col w-full">
          <label className="block font-semibold text-lg mb-2">
            {t("withdraw.Enter Amount")}
          </label>
          <input
            type="number"
            className="w-full lg:w-[400px] border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={withdraw === 0 ? "" : withdraw}
            onChange={(e) => setWithdraw(Number(e.target.value))}
          />

          {/* paragraph */}
          {isValid ? (
            <p className="text-[8px] md:text-xs text-gray-500 mt-4">
              {t("withdraw.You can withdraw any amount between")} $40,340{" "}
              {t("withdraw.and")} $44,340
            </p>
          ) : (
            <p className="text-[10px] md:text-xs text-danger mt-4">
              {t("withdraw.Enter a valid amount")}
            </p>
          )}
        </div>

        {/* button */}

        <button
          className="mt-8 bg-success w-full text-center lg:w-[400px] px-2 py-2 text-white rounded-lg"
          onClick={handleClick}
        >
          {t("withdraw.Next")}
        </button>
      </div>
    </div>
  );
}
