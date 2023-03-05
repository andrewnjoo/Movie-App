import React from 'react';
import { Disclosure, Menu } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';

import logo from '@/assets/logo.png';
import { DesktopProfileDropdown } from './DesktopProfileDropdown';
import { MobileSelection } from './MobileSelection';
import { MobileProfile } from './MobileProfile';
import { SearchBar } from './SearchBar';
import { useApiUrl } from '../../../hooks';
import { LoginButton } from '../../ui/LoginButton';

export function classNames(...classes: any): string {
  return classes.filter(Boolean).join(' ');
}

const hrefs = ['/', '/movies', '/tv', '/people']; // TODO - '/favorites'

export default function Navbar(): JSX.Element {
  const [loading, setLoading] = React.useState(true);
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  const { href } = window.location;

  React.useEffect(() => {
    axios
      .get(`${useApiUrl()}/auth/isAuthorized`, {
        headers: {
          token: localStorage.getItem('movie-app-token'),
        },
      })
      .then((res) => {
        setLoading(false);
        if (res.data === true) {
          setIsAuthorized(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Disclosure as='nav' className='bg-white shadow'>
      {({ open }: { open: boolean }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-4 lg:px-8'>
            <div className='flex h-16 justify-between'>
              <div className='flex px-2 lg:px-0'>
                <div className='flex flex-shrink-0 items-center'>
                  <a href={hrefs[0]}>
                    <img className='block h-8 w-auto md:hidden' src={logo} />
                    <text className='hidden h-8 w-auto text-2xl font-bold md:block'>
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
                    }  inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`}
                  >
                    Movies
                  </a>
                  <a
                    href={hrefs[2]}
                    className={`${
                      href.includes('tv')
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`}
                  >
                    TV Shows
                  </a>
                  <a
                    href={hrefs[3]}
                    className={`${
                      href.includes('people')
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`}
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
              <div className='flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end'>
                <SearchBar />
              </div>
              <div className='hidden lg:ml-4 lg:flex lg:items-center'>
                {loading ? (
                  <div className='bg-white-400 h-8 w-8 animate-pulse rounded-full'></div>
                ) : isAuthorized ? (
                  <Menu as='div' className='relative ml-4 flex-shrink-0'>
                    <Menu.Button className='flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                      <span className='sr-only'>Open user menu</span>
                      <FaUserCircle className='h-8 w-8' />
                    </Menu.Button>
                    <DesktopProfileDropdown />
                  </Menu>
                ) : (
                  <LoginButton />
                )}
              </div>
              <div className='flex items-center lg:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
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
            <MobileProfile isAuthorized={isAuthorized} />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
