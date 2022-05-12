import {gql} from "@apollo/client"

export const GET_ID_COMMERCES = gql`
query commerces($first: Int) {
    commerces(first: $first) {
        edges {
            node {
                id
                storekeeperWord
            }
        }
    }
}`;

export const GET_COMMERCES = gql`
query commerces($first: Int) {
    commerces(first: $first) {
        edges {
            node {
                id
                name
                description
                storekeeperWord
            }
        }
    }
}`;

export const GET_DATA_COMMERCE = gql`
    query commerce($id: ID!) {
        commerce(id: $id) {
            id
            description
            storekeeperWord
            address
            phone
            email
            businessHours {
                monday {
                    opening
                    closing
                }
                tuesday {
                    opening
                    closing
                }
                wednesday {
                    opening
                    closing
                }
                thursday {
                    opening
                    closing
                }
                friday {
                    opening
                    closing
                }
                saturday {
                    opening
                    closing
                }
                sunday {
                    opening
                    closing
                }
            }
            products {
                edges {
                    node {
                        id
                        name
                        price
                        unit
                        isBreton
                    }
                }
            }
        }
    }
`;