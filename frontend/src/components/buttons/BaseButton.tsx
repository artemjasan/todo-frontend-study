import React from 'react';
import BaseButtonProps from './buttonInterfaces';
import '../../index.css';
import clsx from 'clsx';

export const BaseButton: React.FC<BaseButtonProps> = ({ onClick, className, label }) => {
  return (
    <button onClick={onClick} className={clsx(className, 'base-button')}>
      {label}
    </button>
  );
};
