import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const callSuccess = (message: string, autoClose: number = 10000) => {
  toast.success(message, {
    position: toast.POSITION.BOTTOM_LEFT,
    autoClose,
  });
};

export const callError = (message: string, autoClose: number = 10000) => {
  toast.error(message, {
    position: toast.POSITION.BOTTOM_LEFT,
    autoClose,
  });
};

export const callLoadingWithPromise = async <T>(
  loadingMessage: string,
  promise: Promise<T>,
  successMessage: string,
  errorMessage: string,
  autoClose: number = 10000
): Promise<T> => {
  const result = await toast.promise(
    promise,
    {
      pending: {
        render: loadingMessage,
        autoClose: false,
      },
      success: {
        render: successMessage,
        autoClose,
      },
      error: {
        render: errorMessage,
        autoClose,
      },
    },
    {
      position: toast.POSITION.BOTTOM_LEFT,
    }
  );

  return result;
};

