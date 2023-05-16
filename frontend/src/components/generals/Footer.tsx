import React from 'react';
import '../../index.css';
import { footerLinks } from '../../variables/AppVariables';
import { NavLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-400 text-black dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center py-1">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <span className="text-xl font-semibold">Taskipy</span>
          </div>
          <nav className="flex flex-wrap">
            {Object.entries(footerLinks).map(([key, value]) => (
              <NavLink to={value} className={({ isActive }) => `mx-2 ${isActive ? 'text-blue-500' : 'hover:text-blue-500'}`}>
                {key}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="text-center">
          <p>© 2023 Taskipy. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
