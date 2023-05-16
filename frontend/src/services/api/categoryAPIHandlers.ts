import { api, headers } from './baseServices';
import { handleApiError } from './errorHandler';
import { Category, CategoryName, CategoryId } from '../../interfaces/category';

export const createCategory = async (data: CategoryName): Promise<Category | void> => {
  try {
    const response = await api.post('/api/categories', data, {
      headers,
    });
    return response.data;
  } catch (error) {
    handleApiError(error, [409]);
  }
};

export const getCategories = async (): Promise<Category[] | void> => {
  try {
    const response = await api.get('/api/categories', {
      headers,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateCategory = async (id: string, data: CategoryName): Promise<Category | void> => {
  try {
    const response = await api.put(`/api/categories/${id}`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    handleApiError(error, [409, 404]);
  }
};

export const deleteCategory = async (id: string): Promise<CategoryId | void> => {
  try {
    const response = await api.delete(`/api/categories/${id}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    handleApiError(error, [404]);
  }
};
