export interface CategoryItem {
  id: string;
  name: string;
}

export type CategoryName = Pick<CategoryItem, 'name'>;
export type CategoryId = Pick<CategoryItem, 'id'>;
