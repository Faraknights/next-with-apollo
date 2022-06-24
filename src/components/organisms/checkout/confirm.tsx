import {Dispatch, SetStateAction, useEffect, useState } from 'react';
import RadioProgression from '../../../components/molecules/checkout/radioProgression';
import useUser from '../../../lib/useUser';
import LoginPopUp from '../../../components/organisms/login/loginPopUp';
import Router, { NextRouter } from 'next/router';
import CustomButton from '../../../components/atoms/general/customButton';
import Layout from '../../../components/organisms/structure/layout';
import getUnitLabel from "../../../lib/getUnitLabel";
import { Basket, BasketStripe, CommerceStripe, ProductStripe } from '../../../interfaces/basket';
import SummaryCheckout from '../../../components/molecules/checkout/summaryCheckout';
import Card from '../../../components/atoms/general/card';
import { Login } from '../../../pages/api/login';
import { PurchaseProcessPage } from '../../../pages/commands/\[stepCheckout\]';
import Timer from '../../atoms/general/timer';
import { getDate, getHours } from '../../../lib/dateToString';
import StatusTag from '../../molecules/commands/statusTag';
import { StatusCommand } from '../../../interfaces/commands';
import Products from '../commerce/products';
import { ArrowSVG } from '../../../assets/svg/general/svgGeneral';

interface ConfirmPageProps{
	basket: Basket;
	setBasket: Dispatch<SetStateAction<Basket>>;
	login: Login;
	setPurchaseProcessPage: Dispatch<SetStateAction<number>>;
	setClickConnection: Dispatch<SetStateAction<boolean>>;
	router: NextRouter;
	confirmStart: boolean;
}

export default function ConfirmPage(options: ConfirmPageProps) {
	const {basket, setBasket, login, router, confirmStart} = options

	const [loading, setLoading] = useState(false)
	const timeGap = 20
	function removeProduct(indexCommerce: number, indexProduct:number){
		setBasket(e => {
			let basketCopy =  {...basket} as Basket
			basketCopy.edges[indexCommerce].products = basketCopy.edges[indexCommerce].products.filter((_, i) => i!=indexProduct)
			if(!basketCopy.edges[indexCommerce].products.length){
				basketCopy.edges = basketCopy.edges.filter((_, i) => indexCommerce!=i)
			}
			localStorage.setItem("basket", JSON.stringify(basketCopy))
			return basketCopy;
		})
	}

  return (
		<div className="min-w-full h-full flex flex-col items-center">
			{confirmStart && (
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
									console.log(data)
								});
						}
				}}/>
			)}
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
			<CustomButton label='Annuler ma commande' color='secondaryColor' onClick={e => {
				router.reload()
			}}/>
		</div>
  )
}
