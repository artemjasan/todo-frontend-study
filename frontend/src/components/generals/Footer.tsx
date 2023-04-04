import React from 'react';
import '../../index.css';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-400 text-black dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center py-1">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <span className="text-xl font-semibold">Taskipy</span>
          </div>
          <nav className="flex flex-wrap">
            <a href="#!" className="mx-2 hover:text-blue-500">
              Home
            </a>
            <a href="#!" className="mx-2 hover:text-blue-500">
              About
            </a>
            <a href="#!" className="mx-2 hover:text-blue-500">
              Contact
            </a>
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
