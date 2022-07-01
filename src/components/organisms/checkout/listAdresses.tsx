import { Dispatch, SetStateAction } from "react";
import { Basket } from "../../../interfaces/basket";
import { User } from "../../../interfaces/user";
import Card from "../../atoms/general/card";
import CustomButton from "../../atoms/general/customButton";
import CustomRadio from "../../atoms/general/customRadio";
import { PageContactInformation } from "../../../pages/commands/contact_information";

interface RadioProgressionProps {
	user: User;
	basket: Basket;
	setBasket: Dispatch<SetStateAction<Basket>>;
	setPage: Dispatch<SetStateAction<number>>;
	setNewCard: Dispatch<SetStateAction<boolean>>;
}

export default function ListAddresses(options : RadioProgressionProps) {
	const {basket, setBasket, setNewCard, setPage, user} = options
	return (
		<>
		
		<div className='grid grid-cols-2 w-2/3'>
			{user && user.addresses && user.addresses.map((address, i) => (
				<div key={address.id} className="w-full px-5">
					<Card key={address.id} className='w-full p-0'>
						<label className='w-full p-2 flex  items-center cursor-pointer'>
							<div className='px-5'>
								<CustomRadio 
									size={32}
									name='address'
									value={address.id}
									currentValue={basket.stripeCard?.stripeID}
									onChange={e => setBasket(basket => {
										const copyBasket = Object.assign({} as Basket, basket)
										copyBasket.address = address
										localStorage.setItem('basket', JSON.stringify(copyBasket))
										return copyBasket
									})}
								/>
							</div>
							<div className='flex flex-col'>
								<div className='flex mb-2'>
									<h3 className='font-medium'>Adresse {i + 1} - Prénom NOM</h3>
								</div>
								<h2 className='text-bodyLarge'>{address.number} {address.route} {address.optionalRoute}</h2>
								<h2 className='text-bodyLarge'>{address.postalCode} {address.city}</h2>
								<h2 className='text-bodyLarge'>01 02 03 04 05</h2>
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