export interface Commerce{
	id?: string;
	name?: string;
	storekeeperWord?: string;
	description?: string;
	products?: {
		edges: Array<ProductNode>
	}
	businessHours?: Schedule; 
	email?: string;
	phone?: string;
	address?: string;
}

export interface Schedule {
	monday: Array<Day>;
	tuesday: Array<Day>;
	wednesday: Array<Day>;
	thursday: Array<Day>;
	friday: Array<Day>;
	saturday: Array<Day>;
	sunday: Array<Day>;
}


export interface Day{
	opening: string;
	closing: string;
}

export interface ProductNode{
	node: Product
}

export interface Product{
	id?: string;
	description?: string;
	name?: string; 
	price?: number; 
	unit?: string; 
	isBreton?: boolean;
	commerceID?: string;
}

export interface ListCommerces {
	commerces: {
		edges: Array<ListCommercesUnit>
	}
}

export interface ListCommercesUnit {
	node:	Commerce
}