import { useState } from "react";

interface LocalStorage {
  setItem: (a: any, b: any) => void;
}
declare global {
  interface Window {
    localStorage: LocalStorage;
  }
}

export const useStorage = (key: string) => {
  const [item, setInnerValue] = useState(() => {
    try {
      const storageValue = window.localStorage.getItem(key);
      if (storageValue) {
        return JSON.parse(storageValue);
      }
      return null;
    } catch (error) {
      return null;
    }
  });

  const setValue = (value: any) => {
    try {
      setInnerValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [item, setValue];
};
