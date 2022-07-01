import Router from 'next/router';
import {Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ArrowSVG } from '../../assets/svg/general/svgGeneral';
import Card from '../../components/atoms/general/card';
import CustomButton from '../../components/atoms/general/customButton';
import Timer from '../../components/atoms/general/timer';
import RadioProgression from '../../components/molecules/checkout/radioProgression';
import StatusTag from '../../components/molecules/commands/statusTag';
import Layout from '../../components/organisms/structure/layout';
import { Basket, BasketStripe, CommerceStripe, ProductStripe } from '../../interfaces/basket';
import { StatusCommand } from '../../interfaces/commands';
import { User } from '../../interfaces/user';
import { getDate, getHours } from '../../lib/dateToString';
import useUser from '../../lib/useUser';

export default function ConfirmPage() {

  const [basket, setBasket] = useState({ edges: [] } as Basket);
  useEffect(() => {
    const tmpBasket = JSON.parse(localStorage.getItem("basket")!);
    if (tmpBasket) setBasket(tmpBasket);
  }, []);

	const timeGap = 30
  
  const { login } = useUser();

  return (
		<Layout title='Confirmation'>
			<div className="w-1/2">
				<RadioProgression
					structure={["Panier", "Créneaux", "Coordonnées", "Confirmation"]}
					currentPos={4}
				/>
			</div>
			<div className="min-w-full h-full flex flex-col items-center">
				<Timer size={60} time={5} callback={() => {
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
						if(login && login.jwt){
							fetch("http://localhost:8082/create-order", {
								method: "POST",
								headers: { 
									"Content-Type": "application/json",
									"Authorization" : "Bearer " + login?.jwt
								},
								body: JSON.stringify({
									PaymentMethodID: basket.stripeCard.stripeID,
									Basket: stripeBasket
								})
							}).then((res) => res.json())
								.then((data) => {
								});
						}
				}}/>
				<div className="w-1/2 mt-4">
					<Card className="my-2">
							<div className="flex flex-col">
								<div className="flex items-center justify-between">
									<h3 className=" text-dark-grey font-bold text-lg">Commande du {getDate({date: new Date()})}</h3>
									<ArrowSVG/>
								</div>
								{basket.edges.map(basketCommerce => (
									<div key={basketCommerce.commerce.id} className="flex items-center justify-between">
										<div className="flex flex-col">
											<h4 className="text-dark-grey font-semibold mt-3">{basketCommerce.commerce.name}</h4>
											<span>{basketCommerce.commerce.address.number} {basketCommerce.commerce.address.route}</span>
											<span>{basketCommerce.commerce.address.postalCode} {basketCommerce.commerce.address.city}</span>
											<span>Collecte : {getDate({date: basketCommerce.pickupDate})} -{'>'} {getHours({date: basketCommerce.pickupDate})} - {getHours({date: new Date(new Date(basketCommerce.pickupDate).setMinutes(new Date(basketCommerce.pickupDate).getMinutes() + timeGap))})}</span>
										</div>
										<StatusTag status={StatusCommand.INPROGRESS}/>
									</div>
								))}
							</div>
					</Card>
				</div>
				<div className="w-1/2 mt-4 mb-4">
					<Card className="my-2">
							<div className="flex flex-col">
								<div className="flex items-center justify-between mb-5">
									<h3 className="font-bold text-lg text-dark-grey">Récapitulatif de commande</h3>
								</div>
								{basket.edges.map(basketCommerce => basketCommerce.products.map(CCProduct => (
									<div key={CCProduct.product.id} className='flex justify-between'>
										<span className='font-medium text-dark-grey'>{CCProduct.product.name}</span>
										<span>x{CCProduct.quantity}</span>
									</div>
								)))}
							</div>
					</Card>
				</div>
				<CustomButton label='Annuler ma commande' color='secondaryColor' onClick={e => 
					Router.push("contact_information")
				}/>
			</div>
		</Layout>
  )
}
