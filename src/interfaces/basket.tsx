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

export interface BasketStripe {
	commerces: Array<CommerceStripe>
}

export interface CommerceStripe {
	commerceID: String;
	pickupDate: Date;
	products: Array<ProductStripe>
}

export interface ProductStripe {
	quantity: number;
	productID: String;
}