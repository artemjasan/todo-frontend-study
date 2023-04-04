import React from 'react';
import { ModalContext, ModalContextProps } from '../components/modals/provider/ModalProvider';

export const useModal = (): ModalContextProps => React.useContext(ModalContext);
