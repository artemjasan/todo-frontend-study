import React from 'react';
import { Category } from '../../interfaces/category';
import CategoryRow from './CategoryRow';
import { CategoryBaseProps } from '.';

interface CategoryListProps extends CategoryBaseProps {
  categories: Array<Category>;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col gap-2 w-full text-black dark:text-white sm:w-[500px] h-[470px] sm:h-[600px] overflow-y-auto">
      {categories.map((category) => (
        <CategoryRow key={category.id} category={category} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default CategoryList;
