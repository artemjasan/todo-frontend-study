export interface Category {
  id: string;
  name: string;
}

export type CategoryName = Pick<Category, 'name'>;
export type CategoryId = Pick<Category, 'id'>;
