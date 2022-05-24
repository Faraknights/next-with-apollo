import {gql} from "@apollo/client"
import { ProductProps } from "../components/organisms/commerce/products";

export interface GetBasketProps {
	name: String;
	description: String;
	quantity: number;
	price: number;
	endingDate: String;
	products: {
		quantity: number;
		product : ProductProps
	}[],
}

export const GET_BASKET = gql`
	query panier($id: ID!) {
		panier(id: $id){
			name
			description
			quantity
			price
			endingDate
			products {
				quantity
				product {
					id,
					name,
					description,
					price,
					unit,
					isBreton
				}
			}
		}
	}
`;

export const GET_COMMERCE_NAME = gql`
	query commerce($id: ID!) {
		commerce(id: $id){
			name
		}
	}
`;

export const GET_PRODUCT_NAME = gql`
	query product($id: ID!) {
		product(id: $id){
			name
			price
			unit
		}
	}
`;