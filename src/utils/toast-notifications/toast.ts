import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const callSuccess = (message: string, autoClose: number = 10.000) => {
  toast.success(message, {
    position: toast.POSITION.BOTTOM_LEFT,
    autoClose: 10000,
  });
};

export const callError = (message: string, autoClose: number = 10.000) => {
  toast.error(message, {
    position: toast.POSITION.BOTTOM_LEFT,
    autoClose: 10000,
  });
};
