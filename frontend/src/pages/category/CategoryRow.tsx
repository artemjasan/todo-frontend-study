import { Category } from '../../interfaces/category';
import { BaseButton } from '../../components/buttons/BaseButton';
import { ButtonSize, ButtonType } from '../../components/buttons/utils';
import { useModal } from '../../hooks/useModal';
import { CategoryBaseProps } from '.';
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import { ModalTypes } from '../../components/modals/factory/ModalFacotry';

interface CategoryItemProps extends CategoryBaseProps {
  category: Category;
}

const CategoryRow: React.FC<CategoryItemProps> = ({ category, onEdit, onDelete }) => {
  const { showModal } = useModal();

  return (
    <div className="w-full p-3 flex justify-between items-center rounded-lg shadow border border-gray-500 bg-gray-400 dark:bg-gray-800">
      <span>{category.name}</span>
      <div className="flex items-center gap-3">
        <BaseButton
          type={ButtonType.WARNING}
          size={ButtonSize.SMALL}
          onClick={() => showModal(ModalTypes.CATEGORY_EDIT, { category, onEdit })}
          icon={<BsFillPencilFill size={18} />}
        />
        <BaseButton
          type={ButtonType.DANGER}
          size={ButtonSize.SMALL}
          onClick={() => showModal(ModalTypes.CATEGORY_DELETE, { category, onDelete })}
          icon={<BsFillTrashFill size={18} />}
        />
      </div>
    </div>
  );
};

export default CategoryRow;
