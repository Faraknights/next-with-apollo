import { Commerce } from "./commerce";
import { CCProduct } from "./product";

export interface Basket {
	edges: Array<BasketCommerce>;
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