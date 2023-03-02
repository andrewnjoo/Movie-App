import React from 'react';

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

const ErrorModal = ({ message, onClose }: ErrorModalProps): JSX.Element => {
  return (
    <div className='fixed z-50 inset-0 overflow-y-auto'>
      <div className='flex items-center justify-center min-h-screen'>
        <div className='fixed inset-0 bg-gray-500 opacity-75'></div>
        <div className='bg-white rounded-lg p-8 z-10 max-w-md mx-auto'>
          <div className='text-red-500 text-lg font-bold mb-4'>{message}</div>
          <div className='flex justify-center'>
            <button
              className='bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500'
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
