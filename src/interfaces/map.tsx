export interface Address {
	id: string;
	number: string;
	route: string;
	optionalRoute?: string;
	postalCode: string;
	city: string;
}

export interface ChangesAddress {
	number?: string;
	route?: string;
	optionalRoute?: string;
	postalCode?: string;
	city?: string;
}