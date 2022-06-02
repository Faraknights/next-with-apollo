import Header from '../components/organisms/header';
import RadioProgression from '../components/atoms/commerce/radioProgression';
import React, { useEffect, useState } from 'react';
import InputForm from '../components/atoms/inputForm';
import { Appearance, loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../components/molecules/checkoutForm';
import useUser from '../lib/useUser';
import Router from 'next/router';
import { Basket } from '../interfaces/basket';

export default function listCommerces() {

	const [stripePromise] = useState(() => loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!))

  const [clientSecret, setClientSecret] = useState("");

	const [basket, setBasket] = useState({} as Basket)

	const {user} = useUser()

	useEffect(() => {
		if(!user?.jwt){
			Router.push("/basket")
		} else {
			const newBasket = localStorage.getItem("basket")
			setBasket(JSON.parse(newBasket!))
			// Create PaymentIntent as soon as the page loads
			
			fetch("http://localhost:8082/create-payment-intent-web", {
				method: "POST",
				headers: { 
					"Content-Type": "application/json",
					"Authorization" : "Bearer " + user?.jwt
				},
				body: JSON.stringify({ 
					basket: JSON.parse(newBasket!),
				}),
			}).then((res) => res.json())
				.then((data) => {
					setClientSecret(data.clientSecret)
				});
		}
  }, []);
 
  const appearance = {
    theme: 'stripe',
  } as Appearance;
	
  const options = {
    clientSecret,
    appearance,
  } as StripeElementsOptions;

	const [card, setCard] = useState({
		cardName: "", 
		cardNumber: "", 
		cardExpiration: "", 
		cardCVC:""
	});

  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
  }, []);

  return (
		<main className="h-full w-full flex items-center justify-center bg-[#fafafe] flex-col">
			<Header/>
			<h1 className="m-5">Paiement</h1>
			<div className='w-1/2'>
				<RadioProgression structure={["Panier", "Créneaux", "Coordonnées", "Confirmation"]} currentPos={4}/>
			</div>
			<div className="w-full h-full flex flex-col items-center">
				{clientSecret && (
					<Elements options={options} stripe={stripePromise}>
						<CheckoutForm />
					</Elements>
				)}
			</div>
		</main>
  )
}
