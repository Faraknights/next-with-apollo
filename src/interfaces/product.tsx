export interface ProductConnection{
	edges: Array<ProductEdge>;
	pageInfo?: ProductPageInfo;
}

export interface ProductEdge {
	cursor?: string;
	node: Product;
}

export interface ProductPageInfo{
	startCursor?: string;
	endCursor?: string;
	hasNextPage?: boolean;
}

export interface Product{
	id?: string;
	name?: string; 
	description?: string;
	price?: number; 
	unit?: string; 
	tva?: number;
	isBreton?: boolean;
	tags?: Array<string>;
	categories?: Array<string>;
}

export interface CCProduct {
	quantity: number;
	product: Product;
}