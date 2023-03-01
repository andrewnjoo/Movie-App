import React from 'react';
import { Disclosure } from '@headlessui/react';

export const MobileProfile = (): JSX.Element => {
  return (
    <div className='pt-4 pb-3 border-t border-gray-200'>
      <div className='flex items-center px-4'>
        <div className='flex-shrink-0'>
          <img
            className='h-10 w-10 rounded-full'
            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            alt=''
          />
        </div>
        <div className='ml-3'>
          <div className='text-base font-medium text-gray-800'>Tom Cook</div>
          <div className='text-sm font-medium text-gray-500'>
            tom@example.com
          </div>
        </div>
      </div>
      <div className='mt-3 space-y-1'>
        <Disclosure.Button
          as='a'
          href='#'
          className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100'
        >
          Your Profile
        </Disclosure.Button>
        <Disclosure.Button
          as='a'
          href='#'
          className='block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100'
        >
          Sign out
        </Disclosure.Button>
      </div>
    </div>
  );
};
