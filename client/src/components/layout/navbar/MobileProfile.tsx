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
        <div className='border-t border-gray-200 pt-4 pb-3'>
          <div className='mt-3 space-y-1'>
            <Disclosure.Button
              as='a'
              href='/profile'
              className='flex items-center gap-2 px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800'
            >
              <FaUserCircle className='h-8 w-8' />
              Your Profile
            </Disclosure.Button>
            <button
              className='block w-full px-4 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800'
              onClick={() => useLogout()}
            >
              Sign out
            </button>
          </div>
        </div>
      ) : (
        <div className='mx-4 mb-4'>
          <LoginButton />
          &nbsp;
        </div>
      )}
    </>
  );
};
