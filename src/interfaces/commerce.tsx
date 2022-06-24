import { User } from "./user";
import { Address } from "./map";
import { Product, ProductConnection } from "./product";
import { PanierConnection } from "./panier";

export interface CommerceConnection{
	edges: Array<CommerceEdge>;
	pageInfo?: CommercePageInfo;
}

export interface CommerceEdge{
	node:	Commerce;
	cursor?: string;
}

export interface CommercePageInfo{
	startCursor?: string;
	endCursor?: string;
	hasNextPage?: boolean;
}

export interface Commerce{
	id?: string;
	storekeeper?: User;
	name?: string;
	description?: string;
	storekeeperWord?: string;
	address?: Address;
	latitude?: number;
	longitude?: number;
	phone?: string;
	email?: string;
	facebook?: string;
	twitter?: string;
	instagram?: string
	businessHours?: BusinessHours; 
	clickAndCollectHours?: BusinessHours;
	categories?: Array<string>;
	products?: ProductConnection;
	services?: Array<string>;
	productsAvailableForClickAndCollect?: Array<Product>;
	paniers?: PanierConnection;
}

export interface BusinessHours {
	monday: Array<Schedule>;
	tuesday: Array<Schedule>;
	wednesday: Array<Schedule>;
	thursday: Array<Schedule>;
	friday: Array<Schedule>;
	saturday: Array<Schedule>;
	sunday: Array<Schedule>;
}


export interface Schedule{
	opening: string;
	closing: string;
}