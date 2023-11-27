import React from 'react';
import { ButtonSize, ButtonType, getButtonSize, getButtonType } from './utils';

export interface BaseClickButtonProps {
  type: ButtonType;
  size: ButtonSize;
  onClick: () => void;
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const BaseButton: React.FC<BaseClickButtonProps> = ({ onClick, type, size, label, icon, disabled }) => {
  const buttonType = getButtonType(type);
  const buttonSize = getButtonSize(size);

  return (
    <button onClick={onClick} className={`${buttonSize} ${buttonType}`} disabled={disabled}>
      {label ? label : icon ? icon : 'Button'}
    </button>
  );
};
