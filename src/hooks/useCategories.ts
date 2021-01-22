import { useState, useEffect } from 'react';

import { Category } from '../types';

export default function useCategories() {
  const [categories, setCategories] = useState([] as Category[]);
  const [error, setError] = useState(null as Error | null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const res = await fetch('https://opentdb.com/api_category.php');
        if (!res.ok) throw new Error(res.statusText);
        const categories = ((await res.json()) as ApiDataResponse).trivia_categories;
        setCategories(categories);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { categories, error, isLoading };
}

type ApiDataResponse = { trivia_categories: Category[]; };