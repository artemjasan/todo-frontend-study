import React from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
import { Category } from '../../interfaces/category';
import '../../App.css';
import ModalWrapper from './ModalWrapper';
import { DefaultModalProps } from './factory/ModalFacotry';

export interface DeleteCategoryModalProps extends DefaultModalProps {
  category: Category;
  onDelete: (id: string) => void;
}

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({ category, onDelete, isOpen, onClose }) => {
  const handleDelete = () => {
    onDelete(category.id);
    onClose();
  };
  return !isOpen ? null : (
    <ModalWrapper>
      <div className="flex flex-col justify-center gap-3 pb-3 w-[500px]">
        <div className="w-full flex justify-center">
          <RiErrorWarningLine size={56} />
        </div>
        <div className="text-center text-lg text-black dark:text-white">
          <p>Are you sure you want to delete this category?</p>
          <p>All tasks associated with this category will also be deleted.</p>
        </div>
        <div className="flex gap-3 justify-center">
          {
            <button
              onClick={handleDelete}
              className="base-button hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium"
            >
              Delete
            </button>
          }
          <button
            onClick={onClose}
            className="base-button hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default DeleteCategoryModal;
