import { useState } from 'react';


export default function useLocalStorage<T extends Object>(key: string, initialValue: T) {
  const [value, setState] = useState(() => {
    const stringStoredValue = window.localStorage.getItem(key);

    if (stringStoredValue === null)
      return initialValue;

    return JSON.parse(stringStoredValue) as T;
  });

  function setValue(action: React.SetStateAction<T>) {
    setState((prev) => {
      if (action instanceof Function) {
        const newState = action(prev);
        window.localStorage.setItem(key, JSON.stringify(newState));
        return newState;
      }
      window.localStorage.setItem(key, JSON.stringify(action));
      return action;
    });
  }

  return { value, setValue };
}