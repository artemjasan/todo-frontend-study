import { Category } from '../../interfaces/category';
import { BaseButton } from '../../components/buttons/BaseButton';
import { useModal } from '../../hooks/useModal';
import { CategoryBaseProps } from '.';

interface CategoryItemProps extends CategoryBaseProps {
  category: Category;
}

const CategoryRow: React.FC<CategoryItemProps> = ({ category, onEdit, onDelete }) => {
  const { showModal } = useModal();

  return (
    <div className="w-1/2 m-1 p-3 rounded-lg shadow border border-gray-500 bg-gray-400 dark:bg-gray-800">
      <div className="flex flex-row justify-between items-center">
        <span>{category.name}</span>
        <div className="flex flex-wraps items-center space-x-3">
          <BaseButton
            onClick={() => showModal('CATEGORY_EDIT', { category, onEdit })}
            className="bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-700"
            label="Edit"
          />
          <BaseButton
            onClick={() => showModal('CATEGORY_DELETE', { category, onDelete })}
            className="bg-red-500 hover:bg-red-600 focus:ring-red-700"
            label="Delete"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryRow;
