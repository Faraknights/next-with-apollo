import {gql} from "@apollo/client"

export const GET_COMMANDS = gql`
	query getCommands {
		commands{
			edges {
				node{
					creationDate
					commerces{
						commerce{
							name
							addressDetailed{
								number
								route
								optionalRoute
								postalCode
								city
							}
						}
						status
						pickupDate
					}
				}
			}
		}
	}
`;