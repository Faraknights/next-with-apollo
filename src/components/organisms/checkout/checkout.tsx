import React, { useEffect, useState } from "react";
import {
  Appearance,
  loadStripe,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../molecules/checkout/checkoutForm";
import useUser from "../../../lib/useUser";
import Router from "next/router";
import { Basket } from "../../../interfaces/basket";

export default function Checkout() {
  const [stripePromise] = useState(() =>
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  );
  const [clientSecret, setClientSecret] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [basket, setBasket] = useState({ edges: [] } as Basket);
  const { login } = useUser();
  if (login && !login.jwt) Router.push("/commands/basket");



  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (login && login.jwt) {
      fetch("http://localhost:8082/create-setup-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + login?.jwt,
        },
        body: JSON.stringify({
          UseStripeSDK: false,
          PaymentMethodID: null,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
        });
    }
  }, [basket]);
  useEffect(() => {
    setBasket(JSON.parse(localStorage.getItem("basket")!));
  }, [trigger]);

  if (login && login.jwt && !trigger) {
    setTrigger(true);
  }

  const appearance = {
    theme: "stripe",
  } as Appearance;

  const options = {
    clientSecret,
    appearance,
  } as StripeElementsOptions;

  return (
    <div className="w-full h-full flex flex-col items-center">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
