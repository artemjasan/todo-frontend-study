import axios from 'axios';
import customToast from '../notification/customToast';

export const handleApiError = (error: unknown, customStatusCodes?: number[]): void => {
  if (axios.isAxiosError(error) && error.response?.status && customStatusCodes?.includes(error.response?.status)) {
    customToast.error(error.response.data.detail);
  } else {
    customToast.error('An unexpected error occurred. Please try again.');
  }
};
