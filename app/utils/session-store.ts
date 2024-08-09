import { useState } from 'react';

export const useSessionStorage = (key: string, initialValue: string) => {
  const [item, setInnerValue] = useState(() => {
    try {
      const storageValue = window.sessionStorage.getItem(key);
      if (storageValue) {
        return JSON.parse(storageValue);
      } else {
        return initialValue;
      }
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      setInnerValue(value);
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [item, setValue];
};
