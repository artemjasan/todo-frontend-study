import { toast } from 'react-toastify';
import './customToastStyles.css';

type ToastType = 'success' | 'error' | 'info' | 'warning';

const baseCustomToast = (message: string, type: ToastType) => {
  toast[type](message, {
    className: 'base-custom-toast',
    position: 'bottom-left',
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    theme: 'colored',
  });
};

const createToastMethod = (type: ToastType) => (message: string) => baseCustomToast(message, type);

const customToast = {
  success: createToastMethod('success'),
  error: createToastMethod('error'),
  info: createToastMethod('info'),
  warning: createToastMethod('warning'),
};

export default customToast;
