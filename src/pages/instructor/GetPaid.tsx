import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function GetPaid() {
  const navigate = useNavigate();
  const {state} = useLocation();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      payment_method: "",
      bank_name: "",
      account_name: "",
      account_number: 0,
      email: "",
    },
    validationSchema: Yup.object({
      payment_method: Yup.string().required(t("withdraw.Please select a payment method")),
      bank_name: Yup.string().when("payment_method", {
        is: "bank",
        then: (schema) => schema.required(t("withdraw.Please select a bank")),
      }),
      account_name: Yup.string().required(t("withdraw.Please enter a valid account Name")),
      account_number: Yup.number().required(
        t("withdraw.Please enter your account number")
      ),
      email: Yup.string().required(t("withdraw.Please enter your email")),
    }),
    onSubmit: (values) => {
      navigate("/instructor/withdraw",{state:{values,analytics:state?.analytics}});
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="container my-6 mx-auto mt-12 bg-background">
      <h1 className="text-2xl font-bold mb-6">{t("withdraw.Enter Payment Details")}</h1>

      {/* Payment Method */}
      <label className="block font-medium mb-2">{t("withdraw.Payment Method")}</label>
      <select
        value={formik.values.payment_method}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        name="payment_method"
        className="w-full lg:w-[50%] border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">{t("withdraw.Please Select")}</option>
        <option value="paypal">{t("withdraw.PayPal")}</option>
        <option value="bank">{t("withdraw.Bank Transfer")}</option>
        <option value="fawry">{t("withdraw.Fawry")}</option>
      </select>
      {formik.touched.payment_method && formik.errors.payment_method && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.payment_method}</p>
      )}

      {/* Acount */}
      <div className="mt-4">
        <label className="block font-medium mb-2">{t("withdraw.Account Name")}</label>
        <input
          type="text"
          value={formik.values.account_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="account_name"
          className="w-full lg:w-[50%] border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={t("withdraw.Enter Account Name")}
        />
        {formik.touched.account_name && formik.errors.account_name && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.account_name}</p>
        )}
      </div>

      {/* Account Email / Number */}
      <div className="mt-4">
        <label className="block font-medium mb-2">
          {formik.values.payment_method === "bank" ? t("withdraw.Account Number") : t("withdraw.Account Email")}
        </label>
        <input
          type={formik.values.payment_method === "bank" ? "number" : "email"}
          value={formik.values.payment_method === "bank" ? formik.values.account_number : formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name={formik.values.payment_method === "bank" ? "account_number" : "email"}
          className="w-full lg:w-[50%] border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={
            formik.values.payment_method === "bank"
              ? t("withdraw.Enter Account Number")
              : t("withdraw.Enter Account Email")
          }
        />
        {formik.values.payment_method === "bank" ? formik.touched.account_number && formik.errors.account_number && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.account_number}</p>
        ) : formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
        )}
        </div>
{/* Bank Select */}
      {formik.values.payment_method === "bank" && (
        <div className="mt-4 transition-all duration-300 ease-in-out">
          <label className="block font-medium mb-2">{t("withdraw.Bank Name")}</label>
          <select
            value={formik.values.bank_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="bank_name"
            className="w-full lg:w-[50%] border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">{t("withdraw.Please Select")}</option>
            <option value="cib">CIB</option>
            <option value="alahly">Al-Ahly</option>
            <option value="egypt">Bank of Egypt</option>
          </select>
          {formik.touched.bank_name && formik.errors.bank_name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.bank_name}</p>
          )}
        </div>
      )}

      {/* Save details */}
      {/* <div className="mt-4 flex items-center">
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
      </div> */}

      {/* Confirm Button */}
      <button
        className="mt-6 w-full lg:w-[50%] bg-success text-white py-2 rounded-lg hover:bg-green-700 transition"
        type="submit"
      >
        {t("withdraw.Continue")}
      </button>
    </form>
  );
}
