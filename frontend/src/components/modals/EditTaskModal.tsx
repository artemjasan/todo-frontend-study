import { useForm } from 'react-hook-form';
import { Category } from '../../interfaces/category';
import ModalWrapper from './ModalWrapper';
import { DefaultModalProps } from './factory/ModalFacotry';
import { TaskWithCategory, TaskUpdate } from '../../interfaces/task';

export interface EditTaskModalProps extends DefaultModalProps {
  task: TaskWithCategory;
  categories: Array<Category>;
  onEdit: (id: string, data: TaskUpdate) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, categories, onEdit, isOpen, onClose }) => {
  const { register, handleSubmit } = useForm<TaskUpdate>({ defaultValues: { ...task } });

  const handleEdit = (formData: TaskUpdate) => {
    onEdit(task.id, formData);
    onClose();
  };

  return !isOpen ? null : (
    <ModalWrapper>
      <div className="px-6 py-4">
        <form className="space-y-5" onSubmit={handleSubmit(handleEdit)}>
          <div className="text-sm">
            <label htmlFor="body" className="block mb-4 text-lg font-medium text-gray-900 dark:text-white">
              Update Category
            </label>
            <textarea
              {...register('body', { required: false, maxLength: 255 })}
              className="w-full bg-gray-50 border border-gray-500 rounded-lg focus:ring-yellow-500 focus:border-blue-500 block p-2.5 dark:bg-gray-400 dark:border-gray-500 dark:placeholder-white"
            />
            {task.body}
            <textarea />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('completed', { required: false })}
              className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded"
            />
            <label htmlFor="completed" className="text-gray-900 dark:text-white">
              Completed
            </label>
          </div>
          <div>
            <label htmlFor="categoryId" className="block mb-4 text-lg font-medium text-gray-900 dark:text-white">
              Category
            </label>
            <select
              {...register('categoryId', { required: false })}
              className="w-full bg-gray-50 border border-gray-500 rounded-lg focus:ring-yellow-500 focus:border-blue-500 block p-2.5 dark:bg-gray-400 dark:border-gray-500 dark:text-white"
            >
              {categories.map((category) => (
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
