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
      <div className="px-6 py-4">
        <form className="space-y-5" onSubmit={handleSubmit(handleEdit)}>
          <div className="text-sm">
            <label htmlFor="name" className="block mb-4 text-lg font-medium text-gray-900 dark:text-white">
              Update Category
            </label>
            <input
              type="name"
              {...register('name', { required: true, maxLength: 32 })}
              className="w-full bg-gray-50 border border-gray-500 rounded-lg focus:ring-yellow-500 focus:border-blue-500 block p-2.5 dark:bg-gray-400 dark:border-gray-500 dark:placeholder-white"
              placeholder="Type new catergory name..."
              required
            />
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

export default EditCategoryModal;
