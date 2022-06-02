import { Commerce, Product } from "./commerce";

export interface Basket {
	commerces: Array<CommerceBasket>
}

export interface CommerceBasket extends Omit<Commerce, 'products'>{
	pickupDate?: Date;
	products: Array<ProductBasket>
}

export interface ProductBasket extends Product{
	quantity: number;
}

export interface BasketStripeProps {
	commerces: Array<{
		commerceID: String;
		pickupDate: Date;
		products: Array<{
			quantity: number;
			productID: String;
		}>
	}>;
}