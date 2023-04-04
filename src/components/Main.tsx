import React from 'react';
import { Outlet } from 'react-router-dom';
import AppRoutes from './AppRoutes';

const Main: React.FC = () => {
  return (
    <main>
      <AppRoutes />
      <Outlet />
    </main>
  );
};

export default Main;
