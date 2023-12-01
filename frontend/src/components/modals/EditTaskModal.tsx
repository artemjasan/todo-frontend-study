import { useForm } from 'react-hook-form';
import ModalWrapper from './ModalWrapper';
import { DefaultModalProps } from './factory/ModalFacotry';
import { TaskWithCategory, TaskUpdate } from '../../interfaces/task';
import useCategories from '../../hooks/useCategories';

export interface EditTaskModalProps extends DefaultModalProps {
  task: TaskWithCategory;
  onEdit: (id: string, data: TaskUpdate) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, onEdit, isOpen, onClose }) => {
  const { register, handleSubmit } = useForm<TaskUpdate>({
    defaultValues: { body: task.body, categoryId: task.category.id, completed: task.completed },
  });
  const categories = useCategories();

  const handleEdit = (formData: TaskUpdate) => {
    onEdit(task.id, formData);
    onClose();
  };

  return !isOpen ? null : (
    <ModalWrapper>
      <div className="px-6 py-6 lg:px-8">
        <h3 className="text-center mb-4 text-2xl font-medium text-gray-900 dark:text-white">Update task</h3>
        <form className="space-y-6" onSubmit={handleSubmit(handleEdit)}>
          <div>
            <label htmlFor="body" className="block mb-2 font-medium text-gray-900 dark:text-white">
              New task
            </label>
            <input
              {...register('body', { required: false, maxLength: 255 })}
              className="text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Type new task..."
            />
          </div>
          <div className="flex flex-row items-center space-x-3">
            <label htmlFor="completed" className="block font-medium text-gray-900 dark:text-white">
              Completed
            </label>
            <input
              type="checkbox"
              {...register('completed', { required: false })}
              className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="categoryId" className="block mb-2 font-medium text-gray-900 dark:text-white">
              Choose a category
            </label>
            <select
              defaultValue={task.category.id}
              {...register('categoryId', { required: false })}
              className="text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            >
              <option selected>{task.category.name}</option>
              {categories
                .filter((category) => category.id !== task.category.id)
                .map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-700 font-medium rounded-lg px-5 py-2.5"
          >
            Update
          </button>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default EditTaskModal;
