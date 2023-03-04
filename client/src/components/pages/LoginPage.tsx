import React, { useState } from 'react';
import axios from 'axios';

import ErrorModal from '../ui/ErrorModal';
import logo from '@/assets/logo.png';
import { useApiUrl } from '../../hooks';
import ShowPasswordButton from '../ui/ShowPasswordButton';

const LoginPage = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = (event: any): void => {
    event.preventDefault();
    axios
      .post(`${useApiUrl()}/auth/login`, { email, password })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem('movie-app-token', res.data.token);
          window.location.href = '/';
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data || err.message);
      });
  };

  React.useEffect(() => {
    if (email === 'alice@example.com' && password === 'C0mplexP@ss') {
      handleSubmit(new Event('submit'));
    }
  }, [email, password]);

  return (
    <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img className='mx-auto h-12 w-auto' src={logo} alt='Your Company' />
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
          Login
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Or{' '}
          <a
            href='/register'
            className='font-medium text-indigo-600 hover:text-indigo-500'
          >
            register
          </a>
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-300 mx-4'>
          {error && (
            <ErrorModal
              message={error}
              onClose={() => {
                setError('');
              }}
            />
          )}
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email address
              </label>
              <div className='mt-1'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <div className='mt-1'>
                <input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  autoComplete='current-password'
                  required
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                />
                <ShowPasswordButton
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                Sign in
              </button>
            </div>
            <button
              type='button'
              className='flex w-full justify-center rounded-md border border-transparent bg-teal-600 hover:bg-teal-700 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 py-2 px-4 mt-4'
              onClick={() => {
                setEmail('alice@example.com');
                setPassword('C0mplexP@ss');
              }}
            >
              Demo Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { LoginPage };
