import { GET_BASKET } from '../graphql/queryBasket';
import client from '../apollo/client'
import { ProductProps } from '../components/organisms/commerce/products';
import Header from '../components/organisms/header';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import RadioProgression from '../components/atoms/commerce/radioProgression';

interface BasketProps {
	name: String;
	description: String;
	quantity: number;
	price: number;
	endingDate: String;
	products: {
		quantity: number;
		product : ProductProps
	}[],
}

const idBasket = "625aec7b92a510926add41f0";


export default function listCommerces() {

	const emptyBasket = {
		name: "",
		description: "",
		quantity: 0,
		price: 0,
		endingDate: "",
		products: [],
	} as BasketProps

	const [basket, setBasket] = useState(emptyBasket)

	useEffect(() => {
		const stringbasket = localStorage.getItem("basket")
		if(stringbasket){
			setBasket(JSON.parse(stringbasket))
		}
	}, [])

  return (
	<main className="h-full w-full flex items-center justify-center bg-[#fafafe] flex-col">
	  <Header/>
	  <h1 className="m-5">baskets</h1>
		<div className='w-1/2'>
			<RadioProgression structure={["Panier", "Créneaux",  "Paiement", "Confirmation"]} currentPos={1}/>
		</div>
	  <div className="w-full h-full flex flex-col items-center">
			<div className='flex'>
				<button 
					onClick={async e => {
						const {data} =  await client.query({ query: GET_BASKET, variables: { id:  idBasket } })
						localStorage.setItem( "basket", JSON.stringify(data.panier))
						setBasket(data.panier)
					}}
					className="m-1 p-2 bg-orange-400 rounded-lg text-white"
				>Récuperer un basket depuis le serveur</button>
				<button 
					onClick={async e => {
						localStorage.setItem( "basket", JSON.stringify(emptyBasket))
						setBasket(emptyBasket)
					}}
					className="m-1 p-2 bg-red-400 rounded-lg text-white"
				>Supprimer le basket en cours</button>
			</div>
			<div className='bg-white mt-3 p-4 rounded-lg w-1/2 flex flex-col shadow-md'>
				<h2>{basket.name}</h2>
				<span className='text-gray-600'>{basket.description}</span>
				<span className='text-gray-600'>quantité: {basket.quantity}</span>
				<span className='text-gray-600'>Date de fin: {basket.endingDate}</span>
				<span className='text-gray-600'>Prix: {basket.price}€</span>
				<h3>Produit</h3>
				{ basket.products.map(produit => (
					<p key={produit.product.id}>{produit.product.name} - {produit.product.price}€/{produit.product.unit} - x{produit.quantity}</p>
				))}
			</div>
			<Link href={"/time_slot"}>
				<button className=" mt-4 p-2 bg-orange-400 rounded-lg text-white" >Continuer</button>
			</Link>
	  </div>
	</main>
  )
}
