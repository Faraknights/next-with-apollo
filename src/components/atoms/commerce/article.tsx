import { useState } from "react";
import { Basket } from "../../../interfaces/basket";
import { Commerce } from "../../../interfaces/commerce";
import getUnitLabel from "../../../lib/getUnitLabel";

interface ArticleProps {
	id: string;
	price: number;
	unit: string;
	name: string;
	isBreton: boolean;
	commerce: Commerce;
}

export default function article (options: ArticleProps){
	const [clicked, setClicked] = useState(false)
	const {id, price, unit, name, isBreton, commerce} = options
	return (
		<>
			<div className='w-full pb-[100%] bg-[#DDD] rounded-2xl relative overflow-hidden mb-2'>
				{/* Image de base, pas d'image d'article actuellement */}
				<img 
					className='w-6/12 absolute left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%] opacity-40'
					src="https://img.icons8.com/material/344/picture--v1.png" alt="logo de base d'une image"
				/>
				{/* Indicateur de prix de l'article */}
				<span className='absolute right-0 bottom-0 text-white px-2 bg-[#ff8c60] rounded-tl-md text-xs'>
					{price}€/{getUnitLabel(unit)}
				</span>
			</div>
			<div className='flex justify-between'>
				<div className='flex'>
					{/* Nom du produit et indicateur breton */}
					{ isBreton && (
						<img className="w-5 mr-1" src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Gwenn_ha_Du_%2811_mouchetures%29.svg"/>
					)}
					<span className=" overflow-hidden text-ellipsis">{name}</span>
				</div>
				{clicked ? (
					<span className="text-gray-500">ajouté</span>
				) : (
					<button 
						className="text-white bg-orange-400 px-2 rounded flex items-center"
						onClick={e => {
							let basket = JSON.parse(localStorage.getItem('basket')!) as Basket
							const i = basket.commerces.findIndex(elem => commerce.id == elem.id)
							if(i >= 0){
								const j = basket.commerces[i].products.findIndex(product => product.id == id)
								if(j >= 0){
									basket.commerces[i].products[j].quantity++
								} else {
									basket.commerces[i].products.push({
										name: name,
										price: price,
										id: id,
										quantity: 1,
										unit: unit,
									})
								}
							} else {
								basket.commerces.push({
									businessHours: commerce.businessHours,
									id: commerce.id,
									name: commerce.name,
									pickupDate: new Date(new Date(new Date().setSeconds(0)).setMilliseconds(0)),
									products: [{
										name: name,
										price: price,
										id : id,
										quantity: 1,
										unit: unit
									}]
								})
							}
							localStorage.setItem('basket', JSON.stringify(basket))
							setClicked(true)
						}}
					>
						ajouter 1
					</button>
				)}
			</div>
		</>
	)
}