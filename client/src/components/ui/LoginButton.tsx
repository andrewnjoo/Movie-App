import React from 'react';
import { BiLogIn } from 'react-icons/bi';

export const LoginButton = (): JSX.Element => {
  return (
    <div className='flex items-center bg-indigo-600 hover:bg-indigo-700 w-32 rounded-lg'>
      <BiLogIn className='h-6 w-6 text-white' />
      <a
        href='/login'
        className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white'
      >
        Login
      </a>
    </div>
  );
};
