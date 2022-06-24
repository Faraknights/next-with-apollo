import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
	uri:  'http://localhost:8082/query',
});

const authLink = setContext((_, context) => {
	const {accessToken} = context
	return {
		headers: {
			...context.headers,
			authorization: accessToken ? accessToken : "",
		}
	}
});

export default new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
});
