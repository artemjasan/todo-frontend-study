import React, { createContext, PropsWithChildren, useState } from 'react';
import { MODAL_COMPONENTS, MODAL_TYPES } from '../factory/ModalFacotry';

type FunctionModalProps<T extends ModalTypes> = (typeof MODAL_COMPONENTS)[T] extends React.FC<infer R>
  ? Omit<R, 'isOpen' | 'onClose'>
  : never;

type ShowModalFunc = <T extends ModalTypes>(modalType: T, modalProps: FunctionModalProps<T>) => void;

type ModalKeys = keyof typeof MODAL_COMPONENTS;
type ComponentsProps = {
  [K in ModalKeys]: (typeof MODAL_COMPONENTS)[K] extends React.FC<infer R> ? R : never;
};

type ModalPropsUnion = ComponentsProps[ModalTypes];

export interface ModalContextProps {
  modal?: ModalProps;
  showModal: ShowModalFunc;
  closeModal: () => void;
}
export type ModalTypes = keyof typeof MODAL_TYPES;

export interface ModalProps {
  modalType: ModalTypes;
  modalProps: ModalPropsUnion;
}

export const ModalContext = createContext<ModalContextProps>({
  modal: undefined,
  showModal: () => ({}),
  closeModal: () => ({}),
});
/** This provider is responsible for opening/closing active modal
 *
 * @param param0 - children, which is main page content
 * @returns <ModalContext.Provider/>
 */
export const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [modal, setModal] = useState<ModalProps>();

  const closeModal = () => setModal(undefined);

  const showModal: ShowModalFunc = (modalType, modalProps) =>
    setModal({
      modalType,
      modalProps: modalProps as unknown as ModalPropsUnion,
    });

  return <ModalContext.Provider value={{ showModal, modal, closeModal }}>{children}</ModalContext.Provider>;
};
