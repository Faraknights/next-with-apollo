import { Product } from "./product";

export interface PanierConnection{
	edges: Array<PanierEdge>;
	pageInfo?: PanierPageInfo;
}

export interface PanierEdge {
	cursor?: string;
	node: Panier;
}

export interface PanierPageInfo{
	startCursor?: string;
	endCursor?: string;
	hasNextPage?: boolean;
}

export interface Panier{
	id?: string;
	name?: string;
	description?: string;
	type?: string;
	category?: string;
	quantity?: number;
	price?: number;
	reduction?: number;
	endingDate?: Date;
	products?: Array<PanierProduct>;
}

export interface PanierProduct{
	quantity: number;
	product: Product
}