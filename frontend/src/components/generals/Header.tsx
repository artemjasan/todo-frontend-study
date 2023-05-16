import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import useThemeMode from '../../hooks/useThemeMode';
import { appLinks } from '../../variables/AppVariables';

const Header: React.FC = () => {
  const [themeMode, toggleThemeMode] = useThemeMode();

  return (
    <header className=" bg-gray-400 text-black dark:bg-gray-800 dark:text-white py-3">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            {/* Здесь ваш логотип, например, <img src={appLogo} alt="Logo" /> */}
            <NavLink to="/">
              <span className="text-xl font-semibold">Taskipy</span>
            </NavLink>
          </div>
          <nav className="flex flex-wrap items-center">
            {Object.entries(appLinks).map(([key, value]) => (
              <NavLink to={value} className={({ isActive }) => `mx-2 ${isActive ? 'text-blue-500' : 'hover:text-blue-500'}`}>
                {key}
              </NavLink>
            ))}
          </nav>
          <button onClick={toggleThemeMode} className="ml-4 p-1">
            {themeMode === 'light' ? <BsFillMoonFill size={22} /> : <BsFillSunFill size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
