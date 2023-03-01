import React from 'react';
import { Disclosure, Menu } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

import logo from '@/assets/logo.png';
import { DesktopProfileDropdown } from './DesktopProfileDropdown';
import { MobileSelection } from './MobileSelection';
import { MobileProfile } from './MobileProfile';

export function classNames(...classes: any): string {
  return classes.filter(Boolean).join(' ');
}

const hrefs = ['/', '/movies', '/tv', '/people']; // TODO - '/favorites'

export default function Navbar(): JSX.Element {
  const { href } = window.location;
  return (
    <Disclosure as='nav' className='bg-white shadow'>
      {({ open }: { open: boolean }) => (
        <>
          <div className='max-w-7xl mx-auto px-2 sm:px-4 lg:px-8'>
            <div className='flex justify-between h-16'>
              <div className='flex px-2 lg:px-0'>
                <div className='flex-shrink-0 flex items-center'>
                  <a href={hrefs[0]}>
                    <img className='block md:hidden h-8 w-auto' src={logo} />
                    <text className='text-2xl font-bold hidden md:block h-8 w-auto'>
                      Movie App
                    </text>
                  </a>
                </div>
                <div className='hidden lg:ml-6 lg:flex lg:space-x-8'>
                  <a
                    href={hrefs[1]}
                    className={`${
                      href.includes('movies')
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }  inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    Movies
                  </a>
                  <a
                    href={hrefs[2]}
                    className={`${
                      href.includes('tv')
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    TV Shows
                  </a>
                  <a
                    href={hrefs[3]}
                    className={`${
                      href.includes('people')
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    People
                  </a>
                  {/* TODO: Favorites */}
                  {/* <a
                    href={hrefs[4]}
                    className={`${
                      href.includes('favorites')
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    Favorites
                  </a> */}
                </div>
              </div>
              <div className='flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end'>
                {/* SearchBar */}
              </div>
              <div className='hidden lg:ml-4 lg:flex lg:items-center'>
                <Menu as='div' className='ml-4 relative flex-shrink-0'>
                  <div>
                    <Menu.Button className='bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                      <span className='sr-only'>Open user menu</span>
                      <img
                        className='h-8 w-8 rounded-full'
                        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                        alt=''
                      />
                    </Menu.Button>
                  </div>
                  <DesktopProfileDropdown />
                </Menu>
              </div>
              <div className='flex items-center lg:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
          <Disclosure.Panel className='lg:hidden'>
            <MobileSelection href={href} hrefs={hrefs} />
            <MobileProfile />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
