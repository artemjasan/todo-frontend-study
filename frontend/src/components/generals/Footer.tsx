import React from 'react';
import '../../index.css';
import { footerLinks } from '../../variables/AppVariables';
import { NavLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-400 text-black dark:bg-gray-800 dark:text-white py-3 px-3">
      <div className="flex justify-between items-center pb-3">
        <div className="w-full">
          <span className="text-xl font-semibold">Taskipy</span>
        </div>
        <nav className="flex items-center gap-3 justify-center">
          {Object.entries(footerLinks).map(([key, value]) => (
            <NavLink key={key} to={value} className={({ isActive }) => `${isActive ? 'text-blue-500' : 'hover:text-blue-500'}`}>
              {key}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="text-center dark:text-gray-400 text-gray-600 text-sm">
        <p>© 2023 Taskipy. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
