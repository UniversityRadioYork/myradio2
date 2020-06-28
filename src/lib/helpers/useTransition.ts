import { DocumentNode } from "graphql";
import { useApolloClient } from "@apollo/react-hooks";

export function useTransition(
  query: DocumentNode,
  {
    timeout,
  }: {
    timeout: number;
  } = { timeout: 16 }
) {
  const client = useApolloClient();
  return (
    variables: any,
    onReady: () => any,
    onPending: () => any,
    onError?: (err: any) => any
  ) => {
    // Query the cache - if it's there, finish immediately
    try {
      client.readQuery({
        query,
        variables,
      });
      // Yay
      onReady();
      return;
    } catch (e) {
      // Nope.
    }
    const timer = window.setTimeout(() => {
      onPending();
    }, timeout);

    client
      .query({
        query,
        variables,
      })
      .then(() => {
        // We discard the query result - it'll be in the cache
        window.clearTimeout(timer);
        onReady();
      })
      .catch(onError);

    return () => window.clearTimeout(timer);
  };
}
