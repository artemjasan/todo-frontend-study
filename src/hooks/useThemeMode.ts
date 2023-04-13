import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

export type ThemeMode = 'light' | 'dark';
type SetThemeMode = (value: ThemeMode) => void;

const useThemeMode = (): [ThemeMode, SetThemeMode] => {
  const [themeMode, setThemeMode] = useLocalStorage<ThemeMode>('themeMode', 'light');

  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.body.classList;

    themeMode === 'dark' ? bodyClass.add(className) : bodyClass.remove(className);
  }, [themeMode]);

  return [themeMode, setThemeMode];
};

export default useThemeMode;
