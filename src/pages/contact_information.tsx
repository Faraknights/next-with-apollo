import Header from '../components/organisms/header';
import RadioProgression from '../components/atoms/commerce/radioProgression';
import { useEffect, useState } from 'react';
import useUser from '../lib/useUser';
import { Basket } from '../interfaces/basket';
import Card from '../components/organisms/card';
import SummaryCheckout from '../components/molecules/summaryCheckout';
import CustomButton from '../components/atoms/customButton';
import Router from 'next/router';

export default function listCommerces() {
	const [basket, setBasket] = useState({commerces: []} as Basket)

	const [commands, setCommands] = useState({} as any)
	const {user} = useUser()
	
	useEffect(() => {
		/*if(!user?.jwt){
			Router.push("/basket")
		}*/
		const newBasket = localStorage.getItem("basket")
		setBasket(JSON.parse(newBasket!))

		/*async function GetUser() {
			const { data: client } = await clientWithHeader.query({ query: GET_COMMANDS, context :{ accessToken : user!.jwt} });
			setCommands(client.user)
		}
		if(user)
			GetUser()*/
  }, []);

  return (
	<main className="h-full w-full flex items-center justify-center bg-[#fafafe] flex-col">
	  <Header/>
	  <h1 className="m-5">Coordonnées</h1>
		<div className='w-1/2'>
			<RadioProgression structure={["Panier", "Créneaux", "Coordonnées", "Confirmation"]} currentPos={3}/>
		</div>
	  <div className="w-full h-full flex flex-col items-center">
			<Card className='w-1/2 px-4 pb-0'>
				<h2 className='text-black font-semibold'>Récapitulatif de commande</h2>
				<SummaryCheckout basket={basket}/>
			</Card>
			<CustomButton
				label="Payer"
				color='red'
				onClick={e => Router.push('/checkout')}
			/>
	  </div>
	</main>
  )
}
