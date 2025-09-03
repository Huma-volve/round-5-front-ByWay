import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { currencyFormatter } from "@/utils/CurrencyFormatter";
import { useInstructorWithdraw } from "@/hooks/instructor/useInstructorWithdraw";
import type { AxiosError } from "axios";
export default function Withdraw() {
  const { t } = useTranslation();
  const {state} = useLocation();
  const minimum_withdrawal = currencyFormatter.format(state?.analytics.minimum_withdrawal);
  const available_balance = currencyFormatter.format(state?.analytics.available_balance);
  const {mutate , isPending,isError,error} = useInstructorWithdraw();
  const axiosError = error as AxiosError<{error?: string}>;
  const formik = useFormik({
    initialValues: {
      amount: 0,
    },
    validationSchema: Yup.object({
      amount: Yup.number().required(t("withdraw.Enter a valid amount")).min(state?.analytics.minimum_withdrawal,t("withdraw.less than minimum withdrawal")).max(state?.analytics.available_balance,t("withdraw.more than available balance")),
    }),
    onSubmit: (values) => {
      console.log({...values,...state?.values})
      const SubmitValues = {
        ...state?.values,
        amount: values.amount,
      };
      mutate(SubmitValues);
    },
  });
  console.log(state)

  return (
    <form onSubmit={formik.handleSubmit} className="container my-6 mx-auto mt-12 bg-background">
      {/* header */}
      <h1 className="text-2xl font-bold mb-6">
        {t("withdraw.Withdraw Amount")}
      </h1>
      {/* body */}
      <div className="w-full flex flex-col items-start">
        {/* details */}
        <div className="mt-3 flex flex-col gap-3">
          <p className="md:text-lg">
            {t("withdraw.Available Balance")}:{" "}
            <span className="font-bold text-success">{available_balance}</span>
          </p>
          <p className="md:text-lg">
            {t("withdraw.Minimum Withdrawal")}:{" "}
            <span className="font-bold text-secondaryDark">{minimum_withdrawal}</span>
          </p>
        </div>
        {/* input */}
        <div className="mt-6 flex flex-col w-full">
          <label className="block font-semibold text-lg mb-2">
            {t("withdraw.Enter Amount")}
          </label>
          <input
            type="number"
            name="amount"
            className="w-full lg:w-[400px] border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {/* paragraph */}
          {!formik.touched.amount && !formik.errors.amount ? (
            <p className="text-[8px] md:text-xs text-gray-500 mt-4">
              {t("withdraw.You can withdraw any amount between")} {minimum_withdrawal}{" "}
              {t("withdraw.and")} {available_balance}
            </p>
          ) : (
            <p className="text-[10px] md:text-xs text-danger mt-4">
              {formik.errors.amount}
              {/* {t("withdraw.Enter a valid amount")} */}
            </p>
          )}
        </div>
        {/* button */}
        <button
          className={`mt-5 bg-success w-full flex justify-center items-center lg:w-[400px] px-2 py-2 text-white rounded-lg ${isPending && "cursor-not-allowed bg-[#5bae61]/60"}`}
          type="submit"
          disabled={isPending}
        >
          {!isPending && t("withdraw.withdraw")}
          {isPending && <span className="animate-spin border-2 border-white rounded-full size-6 text-center block"></span>}
        </button>
        {/* error */}
        {isError && <p className=" border border-red-500 bg-red-50 px-3 py-4 rounded-lg w-full max-w-[400px] text-danger mt-6">{axiosError?.response?.data?.error}</p>}
      </div>
    </form>
  );
}
