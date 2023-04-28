import React from 'react';
import { CategoryItem } from '../../interfaces/category';
import CategoryRow from './CategoryRow';
import { CategoryBaseProps } from './CategoryMain';

interface CategoryListProps extends CategoryBaseProps {
  categories: CategoryItem[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col items-center text-black dark:text-white">
      {categories.map((category) => (
        <CategoryRow key={category.id} category={category} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default CategoryList;
