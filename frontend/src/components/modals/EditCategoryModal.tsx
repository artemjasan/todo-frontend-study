import { useForm } from 'react-hook-form';
import { Category, CategoryName } from '../../interfaces/category';
import ModalWrapper from './ModalWrapper';
import { DefaultModalProps } from './factory/ModalFacotry';

export interface EditCategoryModalProps extends DefaultModalProps {
  category: Category;
  onEdit: (id: string, data: CategoryName) => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({ category, onEdit, isOpen, onClose }) => {
  const { register, handleSubmit } = useForm<Category>({ defaultValues: { ...category } });

  const handleEdit = (formData: CategoryName) => {
    onEdit(category.id, formData);
    onClose();
  };

  return !isOpen ? null : (
    <ModalWrapper>
      <div className="p-3 w-[300px]">
        <h3 className="text-center mb-4 text-2xl font-medium text-gray-900 dark:text-white">Update task</h3>
        <form className="flex flex-col" onSubmit={handleSubmit(handleEdit)}>
          <section className="flex flex-col gap-1 mb-3">
            <label htmlFor="title" className="text-sm text-gray-900 dark:text-white">
              New name
            </label>
            <input
              type="text"
              {...register('name', { required: true, maxLength: 32 })}
              className="text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Type new catergory name..."
              required
            />
          </section>
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

export default EditCategoryModal;
