import React from 'react';
import { useForm } from 'react-hook-form';
import { CategoryName } from '../../interfaces/category';
import '../../index.css';

interface CategoryFormProps {
  onSubmit: (category: CategoryName) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, reset } = useForm<CategoryName>();

  const submitHandler = (data: CategoryName) => {
    onSubmit(data);
    reset();
  };

  return (
    <form
      className="flex flex-col w-full py-3 px-3 gap-2 text-sm text-black dark:text-white rounded-lg shadow border border-gray-500 sm:w-[500px]"
      onSubmit={handleSubmit(submitHandler)}
    >
      <h3 className="text-start text-lg font-medium">Add a new category</h3>
      <section className="flex gap-3 w-full">
        <input
          type="name"
          {...register('name', { required: true, maxLength: 32 })}
          className="w-full bg-gray-50 border border-gray-500 rounded-lg focus:ring-yellow-500 focus:border-blue-500 block p-2.5 dark:bg-gray-400 dark:border-gray-500 dark:placeholder-white"
          placeholder="Type new catergory name..."
          required
        />
        <button
          type="submit"
          className="w-1/3 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-700 font-medium rounded-lg px-5 py-2.5"
        >
          Create
        </button>
      </section>
    </form>
  );
};

export default CategoryForm;
