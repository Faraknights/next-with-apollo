import {gql} from "@apollo/client"

export const GET_CLIENT = gql`
	query getUser {
		user{
			email,
			firstName,
			commerce {
				name,
				description
			}
		}
	}
`;