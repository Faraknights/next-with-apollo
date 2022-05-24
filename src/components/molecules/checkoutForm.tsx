import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  CardElement
} from "@stripe/react-stripe-js";
import { PaymentIntentResult } from "@stripe/stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    
    elements!.create("card")

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent } : PaymentIntentResult) => {
      switch (paymentIntent!.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e : React.FormEvent) => {
    /*
    fetch("http://localhost:8082/create-payment-intent", {
      method: "POST",
      headers: { 
				"Content-Type": "application/json",
				"Authorization" : "Bearer " + user?.jwt
			},
      body: JSON.stringify({ 
				basket: JSON.parse(newBasket!),
				useStripeSDK: true,
				paymentMethodId: null
			}),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));

    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });

    const paymentMethod = stripe.createPaymentMethod({
      type: 'card',
      card: elements.create("card"),
      billing_details: {
        name: 'Jenny Rosen',
      },
    })
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message!);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);*/
  };
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async () => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    /*
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");*/
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <p>test</p>
      <PaymentElement id="payment-element" />
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <button className="p-3 cursor-pointer bg-orange-400 text-white rounded-lg shadow-lg" disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}