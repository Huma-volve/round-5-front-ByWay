import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import type {
  StripeCardElement,
  StripeCardElementOptions,
  SetupIntentResult,
} from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axiosInstance from "@/lib/axios-instance";
// import { useQueryClient } from "@tanstack/react-query";
// interface paymentFormProps {}

export default function PaymentMethod(/*{}: paymentFormProps*/) {
  const { t } = useTranslation();
// const queryClient = useQueryClient();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    axiosInstance
      .post(
        'payment-methods/setup-intent'
      )
      .then((res) => {
        setClientSecret(res.data.data.client_secret);
        console.log("Client Secret:", res.data);
      })
      .catch((err) => {
        console.error("Error fetching client_secret:", err);
        setMessage("Error loading payment form");
      });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);

    try {
      const result: SetupIntentResult = await stripe.confirmCardSetup(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement) as StripeCardElement,
          },
        }
      );

      console.log("Stripe Result:", result);

      if (result.error) {
        setMessage(result.error.message ?? "An error occurred");
      } else if (result.setupIntent) {
        const paymentMethod = result.setupIntent.payment_method;
        console.log("Payment Method :", paymentMethod);

        await axiosInstance.post(
          'payment-methods',
          {
            payment_method: paymentMethod,
          },
        );

        setMessage("Payment method saved successfully!");

        setTimeout(() => {
          navigate("/checkout");
        }, 10);
      }
    } catch (err: any) {
      setMessage("Error: " + err.message);
      console.error(err);
    }

    setLoading(false);
  };

  const cardStyle: StripeCardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#32325d",
        "::placeholder": { color: "#aab7c4" },
      },
      invalid: { color: "#fa755a" },
    },
  };

  return (
    <div className="min-w-[60%] h-[200px] p-8 mx-auto  rounded-lg bg-[#F8FAFC]">
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div className="bg-gray-50 p-4 rounded border">
          <CardElement options={cardStyle} />
        </div>

        <button
          type="submit"
          disabled={!stripe || !elements || !clientSecret}
          className={`w-full py-2 px-4  rounded text-white font-medium ${
            !stripe || !elements || !clientSecret
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:opacity-[0.8]  transition duration-300"
          }`}
        >
          {loading
            ? `${t("cart.Saving")}...`
            : `${t("cart.Save Payment Method")}`}
        </button>

        {message && (
          <p
            className={`text-sm mt-3 ${
              message.includes("Error") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
