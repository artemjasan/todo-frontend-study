import { Category } from './category';

export interface Task {
  id: string;
  body: string;
  completed: boolean;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskWithCategory extends Omit<Task, 'categoryId'> {
  category: Category;
}
export type TaskCreate = Pick<Task, 'body' | 'categoryId'>;
export type TaskUpdate = Partial<Pick<Task, 'body' | 'completed' | 'categoryId'>>;
export type TaskMarkAsCompleted = Pick<Task, 'completed'>;
export type TaskId = Pick<Task, 'id'>;
