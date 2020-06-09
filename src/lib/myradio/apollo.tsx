import React, { useEffect, useState } from "react";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "@apollo/react-hooks";
import { useSelector } from "react-redux";
import { AppState } from "../../rootReducer";
import MyRadioEnvironments from "./environments";

function createApolloClient(url: string) {
  return new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
      new HttpLink({
          uri: url,
          credentials: "include"
      })
    ]),
    cache: new InMemoryCache()
  });
}

const MyradioApolloProvider: React.FC = ({ children }) => {
  const env = useSelector(
    (state: AppState) => state.GlobalConfig.myradio.environment
  );
  const envConfig = MyRadioEnvironments[env];
  const [client, setClient] = useState<ApolloClient<any> | null>(null);

  useEffect(() => {
    setClient(
      createApolloClient(envConfig.graphqlBase)
    );
  }, [envConfig]);

  if (client === null) {
    return children as any;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default MyradioApolloProvider;
