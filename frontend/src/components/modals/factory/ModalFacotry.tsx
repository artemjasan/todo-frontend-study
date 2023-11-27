import { useModal } from '../../../hooks/useModal';
import DeleteCategoryModal from '../DeleteCategoryModal';
import EditCategoryModal from '../EditCategoryModal';
import EditTaskModal from '../EditTaskModal';

export enum ModalTypes {
  CATEGORY_EDIT = 'CATEGORY_EDIT',
  CATEGORY_DELETE = 'CATEGORY_DELETE',
  TASK_EDIT = 'TASK_EDIT',
}

export const MODAL_COMPONENTS: Record<ModalTypes, React.FC<any>> = {
  [ModalTypes.CATEGORY_EDIT]: EditCategoryModal,
  [ModalTypes.CATEGORY_DELETE]: DeleteCategoryModal,
  [ModalTypes.TASK_EDIT]: EditTaskModal,
};

export interface DefaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalFactory: React.FC = () => {
  const { modal, closeModal } = useModal();
  if (!modal) return null;

  const Component = MODAL_COMPONENTS[modal.modalType];

  const props = { isOpen: true, onClose: closeModal, ...modal.modalProps };

  return <Component {...props} />;
};
