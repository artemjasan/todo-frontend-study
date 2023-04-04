import React from 'react';
import AppRoutes from '../../helpers/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Main: React.FC = () => {
  return (
    <main className="flex-1 h-auto bg-gray-300 dark:bg-gray-700">
      <AppRoutes />
      <ToastContainer />
    </main>
  );
};

export default Main;
