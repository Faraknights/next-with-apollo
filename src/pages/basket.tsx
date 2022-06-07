import {useEffect, useState } from 'react';
import RadioProgression from '../components/atoms/commerce/radioProgression';
import useUser from '../lib/useUser';
import LoginPopUp from '../components/organisms/loginPopUp';
import Router from 'next/router';
import CustomButton from '../components/atoms/customButton';
import Layout from '../components/organisms/layout';
import getUnitLabel from "../lib/getUnitLabel";
import { Basket } from '../interfaces/basket';
import SummaryCheckout from '../components/molecules/summaryCheckout';

export default function listCommerces() {

	const [basket, setBasket] = useState({commerces: []} as Basket)
	const [clicked, setClicked] = useState(false)
	const [loading, setLoading] = useState(false)

	function removeProduct(indexCommerce: number, indexProduct:number){
		setBasket(e => {
			let basketCopy =  {...basket} as Basket
			basketCopy.commerces[indexCommerce].products = basketCopy.commerces[indexCommerce].products.filter((_, i) => i!=indexProduct)
			if(!basketCopy.commerces[indexCommerce].products.length){
				basketCopy.commerces = basketCopy.commerces.filter((_, i) => indexCommerce!=i)
			}
			localStorage.setItem("basket", JSON.stringify(basketCopy))
			return basketCopy;
		})
	}

	useEffect(() => {
		setBasket(JSON.parse(localStorage.getItem("basket")!))
	}, [])
	
	const {user} = useUser()

  return (
		<Layout>
			{ !user && clicked && (
				<LoginPopUp/>
			)}
			<h1 className="m-5 mb-8">Mon panier</h1>
			<div className='w-1/2'>
				<RadioProgression structure={["Panier", "Créneaux",  "Coordonnées", "Confirmation"]} currentPos={1}/>
			</div>
			<div className="w-full h-full flex flex-col items-center">
				<div className='flex'>
					<CustomButton
						label="Vider le panier en cours"
						color="red"
						onClick={async e => {
							localStorage.setItem("basket", JSON.stringify({commerces : []} as Basket))
							setBasket({commerces : []})
						}}
					/>
				</div>
				<div className='bg-white mt-3 p-4 rounded-lg w-1/2 flex flex-col shadow-md'>
					{ basket.commerces.map ((commerce, i) => (
						<div key={commerce.id}>
							<div className='bg-primary-color-lightened pl-2 rounded text-lg font-medium text-black flex items-center justify-between'>
								<span>{commerce.name}</span>
								<div className='bg-white mr-2 text-sm w-5 h-5 rounded-full flex items-center justify-center'>{commerce.products.length}</div>
							</div>
							{ commerce.products.map((product, j) => (
								<div key={product.id} className='grid grid-cols-[auto_1fr_auto] grid-rows-2 my-5'>
									<div className='h-20 w-20 bg-gray-200 rounded-xl flex items-center justify-center row-[1/3] mr-4'>
										<img 
											className='h-2/4 opacity-60'
											src="https://img.icons8.com/material/344/picture--v1.png" 
											alt="logo de base d'une image"
										/>
									</div>
									<span className='font-medium self-center text-lg'>{product.name}</span>
									<CustomButton 
										color='red'
										label="Supprimer"
										onClick={e => removeProduct(i,j)}
									/>
									<span className='self-center text-sm'>
										<b className='font-medium text-2xl text-primary-color mr-2'>{product.price}€</b>/{getUnitLabel(product.unit)}
									</span>
									<div className='self-end flex items-center justify-center'>
										<button 
											className='h-5 w-5 rounded-full bg-primary-color text-white flex items-center justify-center text-lg font-bold'
											onClick={e => {
												if(product.quantity == 1){
													removeProduct(i,j)
												} else {
													setBasket(e => {
														let basketCopy = {...basket} as Basket
														basketCopy.commerces[i].products[j].quantity--
														localStorage.setItem("basket", JSON.stringify(basketCopy))
														return basketCopy;
													})
												}
											}}
										>-</button>
										<span className='mx-2'>{product.quantity}</span>
										<button 
											className='h-5 w-5 rounded-full bg-primary-color text-white flex items-center justify-center text-lg font-bold'
											onClick={e => {
												setBasket(e => {
													let basketCopy = {...basket} as Basket
													basketCopy.commerces[i].products[j].quantity++
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
				</div>
				<div className='w-1/2'>
					<SummaryCheckout basket={basket}/>
				</div>
				<CustomButton 
					loading={loading} 
					color='red' 
					label="Passer ma commande"
					onClick={e => {
						if(!user){
							setClicked(true)
						} else {
							setLoading(true)
							Router.push('/time_slot')
							setLoading(false)
						}
					}}
				/>
			</div>
		</Layout>
  )
}
