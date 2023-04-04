import React from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
import { CategoryItem } from '../../interfaces/category';
import '../../App.css';
import ModalWrapper from './ModalWrapper';
import { DefaultModalProps } from './factory/ModalFacotry';

interface DeleteCategoryModalProps extends DefaultModalProps {
  category: CategoryItem;
  onDelete: (id: string) => void;
}

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({ category, onDelete, isOpen, onClose }) => {
  const handleDelete = () => {
    onDelete(category.id);
    onClose();
  };
  return !isOpen ? null : (
    <ModalWrapper>
      <div className="flex flex-col items-center">
        <div className="mt-2">
          <RiErrorWarningLine size={56} />
        </div>
        <div className="mt-3 text-lg text-black dark:text-white">
          <p>Are you sure you want to delete this category? All tasks associated with this category will also be deleted.</p>
        </div>
        <div className="flex flex-wraps justify-center space-x-3 m-1 p-3 text-sm">
          <button
            onClick={handleDelete}
            className="base-button bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium px-5 py-2.5"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="base-button bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium px-5 py-2.5"
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default DeleteCategoryModal;
