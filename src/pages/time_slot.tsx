import Header from '../components/organisms/header';
import Link from 'next/link';
import RadioProgression from '../components/atoms/commerce/radioProgression';
import {useEffect, useState} from 'react'
import { BasketProps } from './basket';
import useUser from '../lib/useUser';
import Router from 'next/router';

//Faire plusieurs créneaux par commerce
export default function listCommerces() {

	const [page, setPage] = useState(0);

	const [basket, setBasket] = useState({commerces: []} as BasketProps)
	const {user} = useUser()
	console.log(user)
	useEffect(() => {
		if(!user?.jwt){
			Router.push("/basket")
		}
		const newBasket = localStorage.getItem("basket")
		setBasket(JSON.parse(newBasket!))
  }, []);

  return (
	<main className="h-full w-full flex items-center justify-center bg-[#fafafe] flex-col">
	  <Header/>
	  <h1 className="m-5">baskets</h1>
		<div className='w-1/2'>
			<RadioProgression structure={["Panier", "Créneaux",  "Coordonnées", "Confirmation"]} currentPos={2}/>
		</div>
	  <div className="w-full h-full flex  items-start">
			{ basket.commerces.map((commerce, i) => (
				<div 
					key={commerce.commerceID.toString()}
					className={'min-w-full flex flex-col items-center transition'} 
					style={{transform: "translateX(-" + (page * 100).toString() + "%)"}}
				>
					<div className='flex flex-col bg-white w-1/2 shadow-md rounded-lg'>
						<span className='text-center'>choix du créneau pour le commerce {commerce.commerceID}</span>
						<div className='m-3 flex flex-col items-center'>
							<input
								value={new Date(commerce.pickupDate).toISOString().slice(0, 16)}
								onChange={e => {
									setBasket((currentBasket: any) => {
										let stateCopy =  {...currentBasket} as BasketProps
										console.log(e.target.value)
										stateCopy.commerces[i].pickupDate = new Date(e.target.value)
										return stateCopy;
									});
								}}
								type="datetime-local"
							/>
						</div>
					</div>
					<div className='flex'>
						{ i != 0 && (
							<button 
								className=" mt-4 p-2 bg-gray-300 rounded-lg text-white mr-2"
								onClick={() => {
									setPage(page-1)
								}}
							>
								Retour
							</button>
						)}
						{ (i + 1 == basket.commerces.length && (
							<Link href={"/contact_information"}>
								<a>
									<button className=" mt-4 p-2 bg-orange-400 rounded-lg text-white" >Payer</button>
								</a>
							</Link>
						)) || (
							<button 
								className=" mt-4 p-2 bg-orange-400 rounded-lg text-white"
								onClick={() => {
									setPage(page+1)
								}}
							>
								Continuer
							</button>
						)}
					</div>
				</div>
			))}
	  </div>
	</main>
  )
}
