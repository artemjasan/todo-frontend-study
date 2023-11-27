import React, { createContext, PropsWithChildren, useState } from 'react';
import { MODAL_COMPONENTS, ModalTypes, DefaultModalProps } from '../factory/ModalFacotry';

type ModalComponentsMap = typeof MODAL_COMPONENTS;

// Утилита для вывода пропов компонента модального окна
export type FunctionModalProps<T extends ModalTypes> = ModalComponentsMap[T] extends React.FC<infer R>
  ? Omit<R, keyof DefaultModalProps>
  : never;

// Состояние модального окна
interface ModalState<T extends ModalTypes> {
  modalType: T;
  modalProps: FunctionModalProps<T>;
}

type AnyModalState = ModalState<ModalTypes>;

export const ModalContext = createContext<ModalContextProps>({
  modal: undefined,
  showModal: () => ({}),
  closeModal: () => ({}),
});

export interface ModalContextProps {
  modal?: AnyModalState;
  showModal: <T extends ModalTypes>(modalType: T, modalProps: FunctionModalProps<T>) => void;
  closeModal: () => void;
}

export const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [modal, setModal] = useState<AnyModalState | undefined>(undefined);

  const closeModal = () => setModal(undefined);

  const showModal = <T extends ModalTypes>(modalType: T, modalProps: FunctionModalProps<T>) => {
    setModal({ modalType, modalProps } as ModalState<T>);
  };

  return <ModalContext.Provider value={{ showModal, modal, closeModal }}>{children}</ModalContext.Provider>;
};
