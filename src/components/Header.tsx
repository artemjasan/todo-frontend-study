import React from 'react';
import { NavLink } from 'react-router-dom';
import useThemeMode from '../hooks/useThemeMode';

const Header: React.FC = () => {
  const [themeMode, setThemeMode] = useThemeMode();

  const toggleThemeMode = () => setThemeMode(themeMode === 'light' ? 'dark' : 'light');

  return (
    <header className="bg-gray-300 text-zinc-900 dark:bg-gray-800 dark:text-zinc-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-left md:items-center content-center">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            {/* Здесь ваш логотип, например, <img src={appLogo} alt="Logo" /> */}
            <NavLink to="/">
              <span className="text-xl font-semibold">Taskipy</span>
            </NavLink>
          </div>
          <nav className="flex flex-wrap ms-6">
            <NavLink to="/" className={({ isActive }) => `mx-2 ${isActive ? 'text-orange-500' : 'hover:text-yellow-400'}`}>
              Home
            </NavLink>
            <NavLink to="/categories" className={({ isActive }) => `mx-2 ${isActive ? 'text-orange-500' : 'hover:text-yellow-400'}`}>
              Categories
            </NavLink>
            <button onClick={toggleThemeMode} className="ml-4 p-1">
              {themeMode === 'light' ? '🌙' : '☀️'}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
