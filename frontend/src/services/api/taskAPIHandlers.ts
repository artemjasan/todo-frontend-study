import { api, headers } from './baseServices';
import { handleApiError } from './errorHandler';
import { TaskWithCategory, TaskCreate, TaskUpdate, TaskId } from '../../interfaces/task';

export const createTask = async (data: TaskCreate): Promise<TaskWithCategory | undefined> => {
  try {
    const response = await api.post('/api/tasks', data, {
      headers,
    });
    return response.data;
  } catch (error) {
    handleApiError(error, [404]);
  }
};

export const getTasks = async (): Promise<TaskWithCategory[] | undefined> => {
  try {
    const response = await api.get('/api/tasks', {
      headers,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getTask = async (id: string): Promise<TaskWithCategory | undefined> => {
  try {
    const response = await api.get(`/api/tasks/${id}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    handleApiError(error, [404]);
  }
};

export const updateTask = async (id: string, data: TaskUpdate): Promise<TaskWithCategory | undefined> => {
  try {
    const response = await api.patch(`/api/tasks/${id}`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    handleApiError(error, [409, 404]);
  }
};

export const deleteTask = async (id: string): Promise<TaskId | undefined> => {
  try {
    const response = await api.delete(`/api/tasks/${id}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    handleApiError(error, [404]);
  }
};
