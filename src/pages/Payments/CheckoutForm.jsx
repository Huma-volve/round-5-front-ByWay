import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function CheckoutForm() {
      const { t, i18n } = useTranslation();
    useEffect(() => {
      i18n.changeLanguage("ar");
    }, []);
    useEffect(() => {
      const currentLang = i18n.language;
      document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
    }, [i18n.language]);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const token = "5|4PA4cCHitqNhFkhHbewkIEPKxe5FzaBCRNFClMYRb608a877";

  useEffect(() => {
    axios
      .post(
        "http://round5-byway.huma-volve.com/api/payment-methods/setup-intent",
        {},
        {
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setClientSecret(res.data.data.client_secret);
        console.log("Client Secret:", res.data.data.client_secret);
      })
      .catch((err) => {
        console.error("Error fetching client_secret:", err);
        setMessage("Error loading payment form");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);

    try {
      const result = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      console.log("Stripe Result:", result);
      if (result.error) {
        setMessage(result.error.message);
        console.log("result:", result);
        const paymentMethodId = result.setupIntent.id;
        console.log("Payment Method ID:", paymentMethodId);
   
        await axios.post(
          "http://round5-byway.huma-volve.com/api/payment-methods",
          {
            payment_method: paymentMethodId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );

        setMessage("Payment method saved successfully!");
        
        setTimeout(() => {
          navigate("/success");
        }, 1000);
      }
    } catch (err) {
      setMessage("Error: " + err.message);
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto ">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-gray-50 p-4 rounded border">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#fa755a" },
              },
            }}
          />
        </div>
        
        <button
          type="submit"
          disabled={!stripe || !elements || !clientSecret}
          className={`w-full py-3 px-4 rounded text-white font-medium ${
            !stripe || !elements || !clientSecret
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:opacity-[0.8] transition duration-300"
          }`}
        >
          {loading ? `${t("cart.Saving")}...` : `${t("cart.Save Payment Method")}`}
        </button>
        
        {message && (
          <p className={`text-sm mt-3 ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}