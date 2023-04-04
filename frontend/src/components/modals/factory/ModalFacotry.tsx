import { useModal } from '../../../hooks/useModal';
import DeleteCategoryModal from '../DeleteCategoryModal';
import EditCategoryModal from '../EditCategoryModal';

export const MODAL_TYPES = {
  CATEGORY_EDIT: 'CATEGORY_EDIT',
  CATEGORY_DELETE: 'CATEGORY_DELETE',
};

export const MODAL_COMPONENTS = {
  CATEGORY_EDIT: EditCategoryModal,
  CATEGORY_DELETE: DeleteCategoryModal,
};

export interface DefaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/** This component is responsible for Modal creation.
 * It took current modal type from Context and renders corresponding modal
 *
 * @returns Modal
 */
export const ModalFactory: React.FC = () => {
  const { modal, closeModal } = useModal();
  if (!modal) return null;

  const props = modal.modalProps;

  switch (modal.modalType) {
    case 'CATEGORY_EDIT':
      // Check if onEdit is in props, because modalProps is of type ModalPropsUnion (Union type) and we need to help TS to understand that onEdit is in props
      if ('onEdit' in props) {
        return <EditCategoryModal isOpen={true} onClose={closeModal} category={props.category} onEdit={props.onEdit} />;
      }
      return null;

    case 'CATEGORY_DELETE':
      // Check if onDelete is in props, because modalProps is of type ModalPropsUnion (Union type) and we need to help TS to understand that onDelete is in props
      if ('onDelete' in props) {
        return <DeleteCategoryModal isOpen={true} onClose={closeModal} category={props.category} onDelete={props.onDelete} />;
      }
      return null;
    default:
      return null;
  }
};
