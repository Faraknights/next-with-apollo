import {Dispatch, SetStateAction, useEffect, useState } from 'react';
import RadioProgression from '../../../components/molecules/checkout/radioProgression';
import useUser from '../../../lib/useUser';
import LoginPopUp from '../../../components/organisms/login/loginPopUp';
import Router, { NextRouter } from 'next/router';
import CustomButton from '../../../components/atoms/general/customButton';
import Layout from '../../../components/organisms/structure/layout';
import getUnitLabel from "../../../lib/getUnitLabel";
import { Basket } from '../../../interfaces/basket';
import SummaryCheckout from '../../../components/molecules/checkout/summaryCheckout';
import Card from '../../../components/atoms/general/card';
import { Login } from '../../../pages/api/login';
import { PurchaseProcessPage } from '../../../pages/commands/\[stepCheckout\]';

interface BasketPageProps{
	basket: Basket;
	setBasket: Dispatch<SetStateAction<Basket>>;
	login: Login;
	setPurchaseProcessPage: Dispatch<SetStateAction<number>>;
	setClickConnection: Dispatch<SetStateAction<boolean>>;
	router: NextRouter;
}

export default function BasketPage(options: BasketPageProps) {
	const {basket, setBasket, login, setPurchaseProcessPage, setClickConnection, router} = options

	const [loading, setLoading] = useState(false)

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
			{ basket.edges.length !== 0 ? (
				<>
					<div className='bg-white mt-3 p-4 rounded-lg w-1/2 flex flex-col shadow-md'>
						{ basket.edges.map ((basketCommerce, i) => (
							<div key={basketCommerce.commerce.id}>
								<div className='bg-primary-color-lightened pl-2 rounded text-lg font-medium text-black flex items-center justify-between'>
									<span>{basketCommerce.commerce.name}</span>
									<div className='bg-white mr-2 text-sm w-5 h-5 rounded-full flex items-center justify-center'>{basketCommerce.products.length}</div>
								</div>
								{ basketCommerce.products.map((ccProduct, j) => (
									<div key={ccProduct.product.id} className='grid grid-cols-[auto_1fr_auto] grid-rows-2 my-5'>
										<div className='h-20 w-20 bg-gray-200 rounded-xl flex items-center justify-center row-[1/3] mr-4'>
											<img 
												className='h-2/4 opacity-60'
												src="https://img.icons8.com/material/344/picture--v1.png" 
												alt="logo de base d'une image"
											/>
										</div>
										<span className='font-medium self-center text-lg'>{ccProduct.product.name}</span>
										<CustomButton 
											color="secondaryColor"
											label="Supprimer"
											onClick={e => removeProduct(i,j)}
										/>
										<span className='self-center text-sm'>
											<b className='font-medium text-2xl text-primary-color mr-2'>{ccProduct.product.price}€</b>/{getUnitLabel(ccProduct.product.unit)}
										</span>
										<div className='self-end flex items-center justify-center'>
											<button 
												className='h-5 w-5 rounded-full bg-primary-color text-white flex items-center justify-center text-lg font-bold'
												onClick={e => {
													if(ccProduct.quantity == 1){
														removeProduct(i,j)
													} else {
														setBasket(e => {
															let basketCopy = {...basket} as Basket
															basketCopy.edges[i].products[j].quantity--
															localStorage.setItem("basket", JSON.stringify(basketCopy))
															return basketCopy;
														})
													}
												}}
											>-</button>
											<span className='mx-2'>{ccProduct.quantity}</span>
											<button 
												className='h-5 w-5 rounded-full bg-primary-color text-white flex items-center justify-center text-lg font-bold'
												onClick={e => {
													setBasket(e => {
														let basketCopy = {...basket} as Basket
														basketCopy.edges[i].products[j].quantity++
														localStorage.setItem("basket", JSON.stringify(basketCopy))
														return basketCopy;
													})
												}}
											>+</button>
										</div>
									</div>
								))}
							</div>
						))}
						<div className='flex justify-center'>
							<CustomButton
								color="lightGrey"
								label="Vider le panier en cours"
								onClick={async e => {
									localStorage.setItem("basket", JSON.stringify({edges : []} as Basket))
									setBasket({edges : []})
								}}
							/>
						</div>
					</div>
					<div className='w-1/2'>
						<SummaryCheckout basket={basket}/>
					</div> 
				</>
			) : (
				<Card>
					<div className='flex flex-col items-center'>
						<span className='italic'>Aucun produit de vos régions dans votre panier</span>
						<span className='italic mb-4'>Ajoutez-en pour continuer</span>
						<CustomButton 
							label="Chercher des produits"
							onClick={_ => {
								Router.push('/commerces/1')
							}}
						/>
					</div>
				</Card>
			)}
			<CustomButton 
				disabled={basket.edges.length === 0}
				loading={loading} 
				color="secondaryColor"
				label="Passer ma commande"
				onClick={e => {
					if( login && !login.jwt){
						setClickConnection(true)
					} else {
						setLoading(true)
						router.push(
							{pathname: '/commands/time_slot'}, 
							undefined, 
							{ shallow: true }
						)
						setPurchaseProcessPage(1)
						setLoading(false)
					}
				}}
			/>
		</div>
  )
}
