import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://2.56.154.227:7000/graphql",
  cache: new InMemoryCache(),
});

export default client;
