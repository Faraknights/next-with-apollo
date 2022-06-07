import {gql} from "@apollo/client"

export const GET_COMMANDS = gql`
	query commands ($userID: ID!) {
		commands(userID: $userID){
			pageInfo{
				startCursor
				endCursor
				hasNextPage
			}
			edges {
				cursor
				node{
					id
					creationDate
					user{
						id
						createdAt
						email
						role
						firstName
						lastName
						commerce{
							id
							name
							description
							storekeeperWord
							name
						}
						basket{
							commerces{
								commerce{
									name
									id
									description
								}
							}
						}
					}
					commerces{
						id
						commerce{
							name
							id
							description
						}
						id
					}
				}
			}
		}
	}
`;