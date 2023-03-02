import React from 'react';
import { Disclosure } from '@headlessui/react';
import { FaUserCircle } from 'react-icons/fa';

import { LoginButton } from '../../ui/LoginButton';
import { useLogout } from '../../../hooks';

interface MobileProfileProps {
  isAuthorized: boolean;
}

export const MobileProfile = ({
  isAuthorized,
}: MobileProfileProps): JSX.Element => {
  return (
    <>
      {isAuthorized ? (
        <div className='pt-4 pb-3 border-t border-gray-200'>
          <div className='flex items-center px-4'>
            <div className='flex-shrink-0'>
              <FaUserCircle className='h-8 w-8' />
            </div>
            <div className='ml-3'>
              <div className='text-base font-medium text-gray-800'>
                Tom Cook
              </div>
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
            <button
              className='block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100'
              onClick={() => useLogout()}
            >
              Sign out
            </button>
          </div>
        </div>
      ) : (
        <div className='mb-4 mx-4'>
          <LoginButton />
          &nbsp;
        </div>
      )}
    </>
  );
};
