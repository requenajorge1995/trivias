import { useState, useEffect } from 'react';

export default function useCountries() {
  const [countries, setCountries] = useState([] as string[]);
  const [error, setError] = useState(null as Error | null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const res = await fetch('https://restcountries.eu/rest/v2/all');
        if (!res.ok) throw new Error(res.statusText);
        const countries = ((await res.json()) as ApiDataResponse).map(country => country.name);
        setCountries(countries);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { countries, error, isLoading };
}

type ApiDataResponse = { name: string;[x: string]: any; }[];