import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TaskPage from '../pages/task';
import CategoriesPage from '../pages/category';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TaskPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
    </Routes>
  );
};

export default AppRoutes;
