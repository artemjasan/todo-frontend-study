import React from 'react';
import '../../index.css';
import clsx from 'clsx';

export interface BaseButtonProps {
  onClick: () => void;
  className: string;
  label: string;
}

export const BaseButton: React.FC<BaseButtonProps> = ({ onClick, className, label }) => {
  return (
    <button onClick={onClick} className={clsx(className, 'base-button')}>
      {label}
    </button>
  );
};
