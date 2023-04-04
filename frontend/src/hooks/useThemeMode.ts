import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

export type ThemeMode = 'light' | 'dark';
type ToggleThemeMode = () => void;

const useThemeMode = (): [ThemeMode, ToggleThemeMode] => {
  const [themeMode, setThemeMode] = useLocalStorage<ThemeMode>('themeMode', 'light');

  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.body.classList;

    themeMode === 'dark' ? bodyClass.add(className) : bodyClass.remove(className);
  }, [themeMode]);

  const toggleThemeMode = () => setThemeMode(themeMode === 'light' ? 'dark' : 'light');

  return [themeMode, toggleThemeMode];
};

export default useThemeMode;
