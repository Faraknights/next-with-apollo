import RadioProgression from '../components/atoms/commerce/radioProgression';
import React, { useEffect, useState } from 'react';
import { Appearance, loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../components/molecules/checkoutForm';
import useUser from '../lib/useUser';
import Router from 'next/router';
import { Basket, BasketStripe, CommerceStripe, ProductStripe } from '../interfaces/basket';
import Layout from '../components/organisms/layout';

export default function listCommerces() {

	const [stripePromise] = useState(() => loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!))
  const [clientSecret, setClientSecret] = useState("");
	const [basket, setBasket] = useState({edges: []} as Basket)
	const {user} = useUser()

	useEffect(() => {
		if(!user?.jwt){
			Router.push("/basket")
		}
		setBasket(JSON.parse(localStorage.getItem("basket")!))
  }, []);

	useEffect(() => {
		const stripeBasket = {
			commerces: basket.edges.map(basketCommerce => ({
				commerceID: basketCommerce.commerce.id,
				pickupDate: basketCommerce.pickupDate,
				products: basketCommerce.products.map(ccProduct => ({
					productID: ccProduct.product.id,
					quantity: ccProduct.quantity
				} as ProductStripe))
			} as CommerceStripe))
		} as BasketStripe
		// Create PaymentIntent as soon as the page loads
		if(basket.edges.length){
			fetch("http://localhost:8082/create-payment-intent-web", {
				method: "POST",
				headers: { 
					"Content-Type": "application/json",
					"Authorization" : "Bearer " + user?.jwt
				},
				body: JSON.stringify({ 
					basket: stripeBasket,
				}),
			}).then((res) => res.json())
				.then((data) => {
					setClientSecret(data.clientSecret)
				});
		}		
	}, [basket])
	
 
  const appearance = {
    theme: 'stripe',
  } as Appearance;
	
  const options = {
    clientSecret,
    appearance,
  } as StripeElementsOptions;

  return (
		<Layout>
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
		</Layout>
  )
}
