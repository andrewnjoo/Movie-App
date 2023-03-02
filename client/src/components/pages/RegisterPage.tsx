import React from 'react';
import axios from 'axios';

import ErrorModal from '../ui/ErrorModal';
import logo from '@/assets/logo.png';
import { useApiUrl } from '../../config';

const RegisterPage = (): JSX.Element => {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (event: any): void => {
    event.preventDefault();
    axios
      .post(`${useApiUrl()}/auth/register`, { email, name, password })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem('movie-app-token', res.data.token);
          window.location.href = '/';
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data || err.message);
      });
  };

  return (
    <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img className='mx-auto h-12 w-auto' src={logo} alt='Your Company' />
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
          Register
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Or{' '}
          <a
            href='/login'
            className='font-medium text-indigo-600 hover:text-indigo-500'
          >
            login
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                Name
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  name='name'
                  type='name'
                  autoComplete='name'
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
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
                Password <span className='text-red-500'>*</span>
              </label>
              <div className='mt-1'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                />
                <p className='mt-2 text-sm text-gray-500'>
                  Your password must contain:
                  <ul className='list-disc pl-5 mt-1'>
                    <li>At least one digit (0-9)</li>
                    <li>At least one lowercase letter (a-z)</li>
                    <li>At least one uppercase letter (A-Z)</li>
                    <li>Minimum length of 8 characters</li>
                  </ul>
                </p>
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { RegisterPage };
