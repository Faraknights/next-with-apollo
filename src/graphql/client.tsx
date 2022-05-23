import {gql} from "@apollo/client"

export interface Client {
	email: String;
	firstName: String;
	commerce: {
		name : String;
		description: String;
	}
}

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