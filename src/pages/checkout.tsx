import Header from '../components/organisms/header';
import RadioProgression from '../components/atoms/commerce/radioProgression';
import React, { useEffect, useState } from 'react';
import InputForm from '../components/atoms/inputForm';
import { Appearance, loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../components/molecules/checkoutForm';
import { BasketProps } from './basket';
import useUser from '../lib/useUser';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function listCommerces() {

  const [clientSecret, setClientSecret] = useState("");

	const [basket, setBasket] = useState({} as BasketProps)
	const {user} = useUser()
	
	useEffect(() => {
		const newBasket = localStorage.getItem("basket")
		setBasket(JSON.parse(newBasket!))
		console.log(newBasket)
    // Create PaymentIntent as soon as the page loads
  }, []);
	console.log(basket)
 
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
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  return (
		<main className="h-full w-full flex items-center justify-center bg-[#fafafe] flex-col">
			<Header/>
			<h1 className="m-5">Coordonnées</h1>
			<div className='w-1/2'>
				<RadioProgression structure={["Panier", "Créneaux", "Coordonnées", "Confirmation"]} currentPos={4}/>
			</div>
			<div className="w-full h-full flex flex-col items-center">
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			</div>
		</main>
  )
}
