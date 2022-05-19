import {gql} from "@apollo/client"

export const LOGIN = gql`
    mutation login($input: Login!) {
        login(input: $input) 
    }
`;