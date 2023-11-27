import { useForm } from 'react-hook-form';
import { TaskCreate } from '../../interfaces/task';
import useCategories from '../../hooks/useCategories';

export interface TaskFormProps {
  onSubmit: (data: TaskCreate) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, reset } = useForm<TaskCreate>();
  const categories = useCategories();

  const submitHandler = (data: TaskCreate) => {
    onSubmit(data);
    reset();
  };

  return (
    <form
      className="flex flex-col w-full py-3 px-3 text-sm text-black dark:text-white rounded-lg shadow border border-gray-500 sm:w-[600px]"
      onSubmit={handleSubmit(submitHandler)}
    >
      <h3 className="text-start text-lg font-medium pb-2">Add a new task</h3>
      <section className="flex flex-col sm:flex-row gap-2">
        <input
          type="body"
          {...register('body', { required: true, maxLength: 32 })}
          className="w-full bg-gray-50 border border-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-400 dark:border-gray-500 dark:placeholder-white"
          placeholder="Type new task text..."
          required
        />
        <select
          {...register('categoryId', { required: true })}
          className=" bg-gray-50 border border-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-400 dark:border-gray-500 dark:placeholder-white "
          placeholder="Choose a category..."
          defaultValue=""
        >
          <option value={''} disabled>
            Choose a category...
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="sm:w-1/3 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-700 font-medium rounded-lg px-5 py-2.5"
        >
          Create
        </button>
      </section>
    </form>
  );
};

export default TaskForm;
