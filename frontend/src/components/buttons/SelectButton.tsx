import React from 'react';
import { ButtonSize, ButtonType, getButtonSize, getButtonType } from './utils';

export interface SelectButtonProps {
  type: ButtonType;
  size: ButtonSize;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  defaultValue?: string;
}

export const SelectButton: React.FC<SelectButtonProps> = ({ type, size, onChange, options, defaultValue }) => {
  const buttonType = getButtonType(type);
  const buttonSize = getButtonSize(size);

  return (
    <select onChange={(e) => onChange(e.target.value)} className={`${buttonSize} ${buttonType}`} defaultValue={defaultValue}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
