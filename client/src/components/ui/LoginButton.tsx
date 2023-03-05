import React from 'react';
import { BiLogIn } from 'react-icons/bi';

export const LoginButton = (): JSX.Element => {
  return (
    <div className='flex w-32 items-center rounded-lg bg-indigo-600 hover:bg-indigo-700'>
      <BiLogIn className='h-6 w-6 text-white' />
      <a
        href='/login'
        className='inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm'
      >
        Login
      </a>
    </div>
  );
};
