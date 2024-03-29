import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/task/TaskMain';
import CategoriesPage from '../pages/category/CategoryMain';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/categories" element={<CategoriesPage />} />
    </Routes>
  );
};

export default AppRoutes;
