import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-300 text-zinc-900 dark:bg-gray-800 dark:text-zinc-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <span className="text-xl font-semibold">Taskipy</span>
          </div>
          <nav className="flex flex-wrap">
            <a href="#!" className="mx-2 hover:text-yellow-400">
              Home
            </a>
            <a href="#!" className="mx-2 hover:text-yellow-400">
              About
            </a>
            <a href="#!" className="mx-2 hover:text-yellow-400">
              Contact
            </a>
          </nav>
        </div>
        <div className="text-center mt-6">
          <p>© 2023 Taskipy. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
