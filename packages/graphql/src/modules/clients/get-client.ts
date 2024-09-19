import {
  ApolloClient,
  ApolloClientOptions,
  InMemoryCache,
} from "@apollo/client";

export const getClient = (
  subgraphEndpoint: string,
  args?: ConstructorParameters<typeof ApolloClient>[0],
) =>
  new ApolloClient({
    uri: subgraphEndpoint,
    cache: new InMemoryCache(),
    ...args,
  });

export const getSSRClient = (subgraphEndpoint: string) =>
  new ApolloClient({
    ssrMode: true,
    uri: subgraphEndpoint,
    cache: new InMemoryCache(),
  });
