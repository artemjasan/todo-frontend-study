import { api, headers } from './baseServices';
import { handleApiError } from './errorHandler';
import { CategoryItem, CategoryName, CategoryId } from '../../interfaces/category';

export const createCategory = async (category: CategoryName): Promise<CategoryItem | void> => {
  try {
    const response = await api.post('/api/categories', category, {
      headers,
    });
    return response.data;
  } catch (error) {
    handleApiError(error, [409]);
  }
};

export const getCategories = async (): Promise<CategoryItem[] | void> => {
  try {
    const response = await api.get('/api/categories', {
      headers,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateCategory = async (category: CategoryItem): Promise<CategoryItem | void> => {
  const category_id = category.id;
  try {
    const response = await api.put(`/api/categories/${category_id}`, category, {
      headers,
    });
    return response.data;
  } catch (error) {
    handleApiError(error, [409, 404]);
  }
};

export const deleteCategory = async (category_id: string): Promise<CategoryId | void> => {
  try {
    const response = await api.delete(`/api/categories/${category_id}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    handleApiError(error, [404]);
  }
};
