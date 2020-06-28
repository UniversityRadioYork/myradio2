import { useCallback, useEffect, useState } from "react";

export function useFetch<TArgs extends any[], TRes>(
  fetcher: (...args: TArgs) => Promise<TRes>
): [TRes | null, boolean, Error | null, (...args: TArgs) => any] {
  const [data, setData] = useState<TRes | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [args, setArgs] = useState<TArgs | null>(null);

  useEffect(() => {
    if (args === null) {
      return;
    }
    const get = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetcher(...args);
        setData(result);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };
    get();
  }, [fetcher, args]);

  const triggerFetcher = useCallback((...argsIn: TArgs) => setArgs(argsIn), []);

  return [data, loading, error, triggerFetcher];
}
