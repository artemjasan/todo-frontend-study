import { useState, useEffect } from 'react';
import { Category } from '../interfaces/category';
import { getCategories } from '../services/api/categoryAPIHandlers';

const useCategories = (): Category[] => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      if (fetchedCategories) {
        setCategories(fetchedCategories);
      }
    };
    fetchCategories();
  }, []);

  return categories;
};

export default useCategories;
