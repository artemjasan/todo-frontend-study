import React, { useEffect } from 'react';
import { Category, CategoryName } from '../../interfaces/category';
import { createCategory, getCategories, updateCategory, deleteCategory } from '../../services/api/categoryAPIHandlers';
import CategoryList from './CategoriesList';
import CategoryForm from './CategoryForm';
import { BaseProps } from '../../interfaces/basic';

export interface CategoryBaseProps extends BaseProps {
  onEdit: (id: string, data: CategoryName) => void;
}

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const fetchedCategories = await getCategories();
    if (fetchedCategories) {
      setCategories(fetchedCategories);
    }
  };

  const handleCreateCategory = async (formData: CategoryName) => {
    const createdCategory = await createCategory(formData);
    if (createdCategory) {
      setCategories([...categories, createdCategory]);
    }
  };

  const handleEditCategory = async (id: string, formData: CategoryName) => {
    const updatedCategory = await updateCategory(id, formData);
    if (updatedCategory && updatedCategory.id === id) {
      setCategories(categories.map((category) => (category.id === updatedCategory.id ? updatedCategory : category)));
    }
  };

  const handleDeleteCategory = async (id: string) => {
    const deletedCategoryID = await deleteCategory(id);
    if (deletedCategoryID && deletedCategoryID.id === id) {
      setCategories(categories.filter((category) => category.id !== id));
    }
  };

  return (
    <div className="flex flex-col items-center py-3 px-3 gap-3">
      <CategoryForm onSubmit={handleCreateCategory} />
      <CategoryList categories={categories} onEdit={handleEditCategory} onDelete={handleDeleteCategory} />
    </div>
  );
};

export default CategoriesPage;
