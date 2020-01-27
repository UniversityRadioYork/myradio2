import { MyRadioApiConfig, MyRadioApiError } from "./request";
import { useState, useEffect } from "react";

export const useMyradioApi = <TArgs extends {}, TRes extends {}>(
    // TODO: no type safety on args
  requestor: (...args: any) => Promise<TRes>
) => {
    const [data, setData] = useState<TRes | null>(null);
    const [args, setArgs] = useState<TArgs | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (args === null) {
                return;
            }
            try {
                setLoading(true);
                const result = await requestor(typeof args === "number" ? undefined : args);
                setLoading(false);
                setData(result);
            } catch (e) {
                setLoading(false);
                setError(e);
            }
        };
        fetchData();
    }, [requestor, args]);

    return [data, loading, error, (args?: TArgs) => setArgs(args || Math.random() as any)] as const;
};
