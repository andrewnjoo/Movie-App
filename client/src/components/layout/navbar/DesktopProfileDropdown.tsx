import React from 'react';
import { Menu, Transition } from '@headlessui/react';

import { useLogout } from '../../../hooks';

export const DesktopProfileDropdown = (): JSX.Element => {
  return (
    <Transition
      as={React.Fragment}
      enter='transition ease-out duration-100'
      enterFrom='transform opacity-0 scale-95'
      enterTo='transform opacity-100 scale-100'
      leave='transition ease-in duration-75'
      leaveFrom='transform opacity-100 scale-100'
      leaveTo='transform opacity-0 scale-95'
    >
      {/* Desktop profile options */}
      <Menu.Items className='absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
        <Menu.Item>
          <a href='/profile' className='block px-4 py-2 text-sm text-gray-700'>
            Your Profile
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            href='#'
            className='block px-4 py-2 text-sm text-gray-700'
            onClick={() => useLogout()}
          >
            Sign out
          </a>
        </Menu.Item>
      </Menu.Items>
    </Transition>
  );
};
