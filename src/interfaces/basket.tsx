import { Commerce } from "./commerce";
import { Address } from "./map";
import { CCProduct } from "./product";
import { RegisteredPaymentMethod } from "./user";

export interface Basket {
	edges: Array<BasketCommerce>;
	stripeCard?: RegisteredPaymentMethod;
	address?: Address;
}

export interface BasketCommerce{
	commerce?: Commerce;
	pickupDate?: Date;
	products?: Array<CCProduct>;
}


//stripe part
export interface BasketStripe {
	commerces: Array<CommerceStripe>;
}

export interface CommerceStripe {
	commerceID: String;
	pickupDate: Date;
	products: Array<ProductStripe>;
}

export interface ProductStripe {
	quantity: number;
	productID: String;
}