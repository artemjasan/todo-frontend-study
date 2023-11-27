export const enum ButtonType {
  DEFAULT = 'DEFAULT',
  DANGER = 'DANGER',
  WARNING = 'WARNING',
}

export const enum ButtonSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export const getButtonType = (type: ButtonType): string => {
  switch (type) {
    case ButtonType.DEFAULT:
      return 'base-deafult-button';
    case ButtonType.DANGER:
      return 'base-danger-button';
    case ButtonType.WARNING:
      return 'base-warning-button';
    default:
      return 'base-deafult-button';
  }
};

export const getButtonSize = (size: ButtonSize): string => {
  switch (size) {
    case ButtonSize.SMALL:
      return 'h-10 w-12';
    case ButtonSize.MEDIUM:
      return 'h-10 w-24';
    case ButtonSize.LARGE:
      return 'h-10 w-32';
    default:
      return 'h-10 w-12';
  }
};
