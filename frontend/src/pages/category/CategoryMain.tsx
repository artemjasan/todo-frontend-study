import React, { useEffect } from 'react';
import { CategoryItem, CategoryName } from '../../interfaces/category';
import { createCategory, getCategories, updateCategory, deleteCategory } from '../../services/api/categoryAPIHandlers';
import CategoryList from './CategoriesList';
import CategoryForm from './CategoryForm';

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = React.useState<CategoryItem[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const fetchedCategories = await getCategories();
    if (fetchedCategories) {
      setCategories(fetchedCategories);
    }
  };

  const handleCreateCategory = async (createdCategory: CategoryName) => {
    const newCategory = await createCategory(createdCategory);
    if (newCategory) {
      setCategories([...categories, newCategory]);
    }
  };

  const handleEditCategory = async (editedCategory: CategoryItem) => {
    const updatedCategory = await updateCategory(editedCategory);
    if (updatedCategory && updatedCategory.id === editedCategory.id) {
      setCategories(categories.map((category) => (category.id === updatedCategory.id ? updatedCategory : category)));
    }
  };

  const handleDeleteCategory = async (id: string) => {
    const deletedCategoryID = await deleteCategory(id);
    if (deletedCategoryID) {
      // Why it dowsn't quite work?
      // console.log('deletedCategoryID', deletedCategoryID, 'id', id, 'deletedCategoryID.id', deletedCategoryID.id);
      // deletedCategoryID.id' -> undefined??????!!!!!!!
      // but deletedCategoryID -> string/UUID
      // I thought that it would be nice to have checking if the deletedCategoryID.id is the same as the id
      setCategories(categories.filter((category) => category.id !== id));
    }
  };

  return (
    <div className="flex flex-col justify-items-center">
      <CategoryForm onSubmit={handleCreateCategory} />
      <CategoryList categories={categories} onEdit={handleEditCategory} onDelete={handleDeleteCategory} />
    </div>
  );
};

export default CategoriesPage;
