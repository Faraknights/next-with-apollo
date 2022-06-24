import {gql} from "@apollo/client"

export const GET_USER = gql`
	query getUser {
		user{
			id,
			email,
			gender,
			firstName,
			lastName,
			birthdate,
			commerce {
				name,
				description
			},
			addresses{
				id,
				number,
				route,
				optionalRoute,
				postalCode,
				city,
			},
			defaultAddress{
				id,
				number,
				route,
				optionalRoute,
				postalCode,
				city,
			},
			registeredPaymentMethods{
				name,
				stripeID,
				cardBrand,
				cardLast4Digits
			},
			defaultPaymentMethod{
				name,
				stripeID,
				cardBrand,
				cardLast4Digits
			}
		}
	}
`;

export const UPDATE_USER = gql`
	mutation login($id: string ,$input: ChangesUser) {
		login(id: $id, input: $input) 
	}
`;