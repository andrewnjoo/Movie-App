import React from 'react';

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

const ErrorModal = ({ message, onClose }: ErrorModalProps): JSX.Element => {
  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div className='flex min-h-screen items-center justify-center'>
        <div className='fixed inset-0 bg-gray-500 opacity-75'></div>
        <div className='z-10 mx-auto max-w-md rounded-lg bg-white p-8'>
          <div className='mb-4 text-lg font-bold text-red-500'>{message}</div>
          <div className='flex justify-center'>
            <button
              className='rounded-lg bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500'
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
