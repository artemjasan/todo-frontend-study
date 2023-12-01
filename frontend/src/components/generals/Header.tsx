import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import useThemeMode from '../../hooks/useThemeMode';
import { appLinks } from '../../variables/AppVariables';

const Header: React.FC = () => {
  const [themeMode, toggleThemeMode] = useThemeMode();

  return (
    <header className="bg-gray-400 text-black dark:bg-gray-800 dark:text-white py-3 px-3">
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-1 w-fit md:w-auto">
          {/* Здесь ваш логотип, например, <img src={appLogo} alt="Logo" /> */}
          <NavLink to="/">
            <span className="text-xl font-semibold">Taskipy</span>
          </NavLink>
        </div>
        <nav className="flex items-center gap-3 justify-center">
          {Object.entries(appLinks).map(([key, value]) => (
            <NavLink key={key} to={value} className={({ isActive }) => `${isActive ? 'text-blue-500' : 'hover:text-blue-500'}`}>
              {key}
            </NavLink>
          ))}
        </nav>
        <div className="col-span-1 flex justify-end">
          <button onClick={toggleThemeMode}>{themeMode === 'light' ? <BsFillMoonFill size={22} /> : <BsFillSunFill size={22} />}</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
