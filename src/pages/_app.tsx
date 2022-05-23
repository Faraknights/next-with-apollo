import { ApolloProvider } from "@apollo/client";
import client from '../apollo/client'
import '../styles/globals.css'
import type {AppProps} from 'next/app';

/**
 * The application object
 * @param {{Component, pageProps}} param0 the params for the app
 * @return {AppProps} the actual HTML app
 */
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	)
}

export default MyApp
