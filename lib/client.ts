import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const GRAPHQL_ENDPOINT =
        process.env.URL_GRAPH || "URL_GRAPH";//COLOCAR ENDPOINT

export const client = new ApolloClient({
    uri: GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
});
