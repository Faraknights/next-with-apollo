import { GET_BASKET } from '../graphql/queryBasket';
import client from '../apollo/client'
import Header from '../components/organisms/header';
import {useEffect, useState } from 'react';
import RadioProgression from '../components/atoms/commerce/radioProgression';
import useUser from '../lib/useUser';
import LoginPopUp from '../components/organisms/loginPopUp';
import Router from 'next/router';

export interface BasketProps {
	commerces: Array<{
		commerceID: String;
		pickupDate: Date;
		products: Array<{
			quantity: number;
			productID: String;
		}>
	}>;
}

export default function listCommerces() {

	const [basket, setBasket] = useState({commerces: []} as BasketProps)
	const [clicked, setClicked] = useState(false)

	useEffect(() => {
		setBasket(JSON.parse(localStorage.getItem("basket")!))
		localStorage.setItem("basket", JSON.stringify({
			commerces:[{
				commerceID:"62590318a00ebcf29fe0d50f",
				pickupDate: new Date(),
				products: [
					{
						productID:"625907c0ab4a9c245ca07f0a",
						quantity:1
					},{
						productID:"6259086cab4a9c245ca07f0b",
						quantity:2
					}
				]
			},{
				commerceID:"6259647c134fe991163b5926",
				pickupDate: new Date(),
				products:[{
					productID:"625965a8134fe991163b5927",
					quantity: 1
				}]
			}]
		} as BasketProps
		))
	}, [])
	
	const {user} = useUser()
	

  return (
		<main className="h-full w-full flex items-center justify-center bg-[#fafafe] flex-col">
			<Header/>
			{ !user && clicked && (
				<LoginPopUp/>
			)}
			<h1 className="m-5">Panier</h1>
			<div className='w-1/2'>
				<RadioProgression structure={["Panier", "Créneaux",  "Coordonnées", "Confirmation"]} currentPos={1}/>
			</div>
			<div className="w-full h-full flex flex-col items-center">
				<div className='flex'>
					<button 
						onClick={async e => {
							localStorage.setItem( "basket", JSON.stringify({commerces : []} as BasketProps))
							setBasket({commerces : []})
						}}
						className="m-1 p-2 bg-red-400 rounded-lg text-white"
					>Vider le panier en cours</button>
				</div>
				<div className='bg-white mt-3 p-4 rounded-lg w-1/2 flex flex-col shadow-md'>
					{ basket.commerces.map (commerce => (
						<>
							<h2>Commerce {commerce.commerceID}</h2>
							<h3>Produit</h3>
							{ commerce.products.map(product => (
								<p key={product.productID.toString()}>
									{product.productID} - x{product.quantity}
								</p>
							))}
						</>
					))}
				</div>
				<a onClick={() => {
					if(!user){
						setClicked(true)
					} else {
						Router.push('/time_slot')
					}
				}}>
					<button className=" mt-4 p-2 bg-orange-400 rounded-lg text-white" >Continuer</button>
				</a>
			</div>
		</main>
  )
}
