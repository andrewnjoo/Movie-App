import React from 'react';
import { Menu, Transition } from '@headlessui/react';

export const DesktopProfileDropdown = (): JSX.Element => {
  const handleLogout = (): void => {
    localStorage.removeItem('movie-app-token');
    window.location.href = '/';
  };
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
      <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
        <Menu.Item>
          <a href='#' className='block px-4 py-2 text-sm text-gray-700'>
            Your Profile
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            href='#'
            className='block px-4 py-2 text-sm text-gray-700'
            onClick={handleLogout}
          >
            Sign out
          </a>
        </Menu.Item>
      </Menu.Items>
    </Transition>
  );
};
