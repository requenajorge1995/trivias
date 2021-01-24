import { useState, useEffect } from "react";

export default function useFetch<T>(input: RequestInfo, init?: RequestInit) {
  const [data, setData] = useState(undefined as T | undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null as Error | null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(input, init);
        if (!res.ok) throw new Error(res.status.toString());
        setData((await res.json()) as T);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [input, init]);

  return { data, isLoading, error };
}
