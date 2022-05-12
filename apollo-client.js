const client = new ApolloClient({
    uri: 'http://localhost:8082/query',
    cache: new InMemoryCache()
  });

export default client;