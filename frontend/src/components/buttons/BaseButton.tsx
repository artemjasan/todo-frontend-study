import React from 'react';
import BaseButtonProps from './buttonInterfaces';
import '../../index.css';

export const BaseButton: React.FC<BaseButtonProps> = ({ onClick, className, label }) => {
  return (
    <button onClick={onClick} className={`base-button ${className}`}>
      {label}
    </button>
  );
};
