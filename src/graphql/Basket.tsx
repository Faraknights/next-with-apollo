import {gql} from "@apollo/client"

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