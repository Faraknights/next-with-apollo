import { Dispatch, SetStateAction } from "react";
import { Basket } from "../../../interfaces/basket";
import { User } from "../../../interfaces/user";
import Card from "../../atoms/general/card";
import CustomButton from "../../atoms/general/customButton";
import CustomRadio from "../../atoms/general/customRadio";
import { PageContactInformation } from "./contact_information";

interface RadioProgressionProps {
	user: User;
	basket: Basket;
	setBasket: Dispatch<SetStateAction<Basket>>;
	setPage: Dispatch<SetStateAction<number>>;
	setNewCard: Dispatch<SetStateAction<boolean>>;
}

export default function ListCards(options : RadioProgressionProps) {
	const {basket, setBasket, setNewCard, setPage, user} = options
	return (
		<>
		
		<div className='grid grid-cols-3 w-2/3'>
			{user.registeredPaymentMethods && user.registeredPaymentMethods.map(card => (
				<div key={card.stripeID} className="w-full px-5">
					<Card key={card.stripeID} className='w-full p-0'>
						<label className='w-full p-2 flex  items-center cursor-pointer'>
							<div className='px-5'>
								<CustomRadio 
									size={32}
									name='stripeID' 
									value={card.stripeID}
									currentValue={basket.stripeCard?.stripeID} 
									onChange={e => setBasket(basket => {
										const copyBasket = Object.assign({} as Basket, basket)
										copyBasket.stripeCard = card
										localStorage.setItem('basket', JSON.stringify(copyBasket))
										return copyBasket
									})}
								/>
							</div>
							<div className='flex flex-col'>
								<div className='flex mb-2'>
									<h3 className='font-medium'>{card.cardBrand}</h3>
									<h3 className='ml-4 font-medium'>**** {card.cardLast4Digits}</h3>
								</div>
								<h2 className='text-bodyLarge'>Prénom NOM</h2>
								<h2 className='text-bodyLarge'>Expire le --/--/----</h2>
							</div>
						</label>
					</Card>
				</div>
			))}
		</div>
		<div className='flex items-center w-1/2'>
			<div className='flex flex-col w-1/2 mr-2'>
				<CustomButton label='Continuer' color="secondaryColor" onClick={e => {
					setPage(PageContactInformation.main)
				}}/>
			</div>
			<div className='flex flex-col w-1/2 ml-2'>
				<CustomButton label='Ajouter une carte' onClick={e => {
					setNewCard(true)
				}}/>
			</div>
		</div>
	</>
	)	  
}