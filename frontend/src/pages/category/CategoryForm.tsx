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
    <div className="base-component mx-auto w-1/3 px-2 py-2 m-3 rounded-lg shadow border border-gray-500">
      <form className="flex-col space-y-2 text-sm text-black dark:text-white" onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label htmlFor="email" className="block text-center text-lg font-medium">
            Add a new category
          </label>
        </div>
        <div className="">
          <input
            type="name"
            {...register('name', { required: true, maxLength: 32 })}
            className="w-full bg-gray-50 border border-gray-500 rounded-lg focus:ring-yellow-500 focus:border-blue-500 block p-2.5 dark:bg-gray-400 dark:border-gray-500 dark:placeholder-white"
            placeholder="Type new catergory name..."
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-700 font-medium rounded-lg px-5 py-2.5"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
