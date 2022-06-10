import { Basket } from "../../../interfaces/basket"
import { CCProduct } from "../../../interfaces/product"

export default function SummaryCheckout(options : {basket: Basket}) {
	const {basket} = options
	
	const remise = 10
	let products = [] as Array<CCProduct>
	basket.edges.map(basketCommerce => {
		products = [...products, ...basketCommerce.products]
	})
	const nbProduct = Object.values(products).reduce((a, c) =>  a + c.quantity, 0)
	let totalPrice = 0
	if(products.length)
		totalPrice = Object.values(products).reduce((a, c) =>  a + (c.product.price * c.quantity), 0)

	return (
		<div className='flex flex-col w-full my-5'>
			<div className='flex justify-between text-lg font-semibold'>
				<span>Sous-total ({nbProduct} article)</span>
				<span className='place-self-end'>{totalPrice.toFixed(2)}€</span>
			</div>
			<div className='flex justify-between text-lg'>
				<span>Remise</span>
				<span className='place-self-end'>-{remise.toFixed(2)}€</span>
			</div>
			<div className='flex justify-between text-xl text-primary-color font-semibold'>
				<span>Total</span>
				<span className='place-self-end'>{(totalPrice - remise).toFixed(2)}€</span>
			</div>
		</div>
	)
}