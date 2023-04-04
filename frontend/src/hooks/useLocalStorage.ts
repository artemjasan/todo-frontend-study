import { useState, useEffect } from 'react';

type SetValueFunction<T> = (value: T | ((value: T) => T)) => void;

const useLocalStorage = <T>(key: string, initialValue: T): [T, SetValueFunction<T>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // TODO: handle error properly
      console.log(error); // eslint-disable-line no-console
      return initialValue;
    }
  });

  const setValue: SetValueFunction<T> = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // TODO: handle error properly
      console.log(error); // eslint-disable-line no-console
    }
  };

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [storedValue, key]);

  return [storedValue, setValue];
};

export default useLocalStorage;
