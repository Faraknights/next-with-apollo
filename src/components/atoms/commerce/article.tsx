import { useState } from "react";
import { Basket } from "../../../interfaces/basket";
import { Commerce } from "../../../interfaces/commerce";
import { Product } from "../../../interfaces/product";
import getUnitLabel from "../../../lib/getUnitLabel";

interface ArticleProps {
	product: Product
	commerce: Commerce;
}

export default function article (options: ArticleProps){
	const [clicked, setClicked] = useState(false)
	const {product, commerce} = options
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
					{product.price}€/{getUnitLabel(product.unit)}
				</span>
			</div>
			<div className='flex justify-between'>
				<div className='flex'>
					{/* Nom du produit et indicateur breton */}
					{ product.isBreton && (
						<img className="w-5 mr-1" src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Gwenn_ha_Du_%2811_mouchetures%29.svg"/>
					)}
					<span className=" overflow-hidden text-ellipsis">{product.name}</span>
				</div>
				{clicked ? (
					<span className="text-gray-500">ajouté</span>
				) : (
					<button 
						className="text-white bg-orange-400 px-2 rounded flex items-center"
						onClick={e => {
							let basket = JSON.parse(localStorage.getItem('basket')!) as Basket
							if(!basket){
								basket = {edges : []} as Basket
							}
							const i = basket.edges.findIndex(elem => commerce.id == elem.commerce.id)
							if(i >= 0){
								const j = basket.edges[i].products.findIndex(ccProduct => ccProduct.product.id == product.id)
								if(j >= 0){
									basket.edges[i].products[j].quantity++
								} else {
									basket.edges[i].products.push({
										quantity: 1,
										product: product
									})
								}
							} else {
								basket.edges.push({
									commerce: commerce,
									pickupDate: new Date(new Date(new Date().setSeconds(0)).setMilliseconds(0)),
									products: [{
										quantity: 1,
										product: product,
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