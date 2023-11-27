import React from 'react';
import { useModal } from '../../hooks/useModal';

interface ModalWrapperProps {
  children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children }) => {
  const { closeModal } = useModal();

  return (
    <div className="fixed z-10 inset-0 transition-opacity min-h-screen flex justify-center">
      <div className="absolute inset-0 bg-gray-400 opacity-40" aria-hidden="true" onClick={closeModal} />
      <div className="p-3 w-fit h-fit mt-20 dark:bg-gray-700 rounded-lg shadow-xl transform">{children}</div>
    </div>
  );
};

export default ModalWrapper;
