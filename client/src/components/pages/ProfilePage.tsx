import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';

import { useApiUrl } from '../../hooks';

const ProfilePage = (): JSX.Element => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    axios
      .get(`${useApiUrl()}/auth/getUserDetails`, {
        headers: {
          token: localStorage.getItem('movie-app-token'),
        },
      })
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='mx-auto mt-10 max-w-sm overflow-hidden rounded border border-gray-300 shadow-lg'>
      <p className='m-6 mb-2 text-xl font-bold text-gray-700'>My Profile</p>
      <div className='px-6 py-4'>
        <div className='mb-4 flex items-center'>
          <FaUserCircle className='mr-4 text-4xl' />
          <div>
            <div className='mb-2 text-xl font-bold'>{name}</div>
            <p className='text-base text-gray-700'>{email}</p>
          </div>
        </div>
        {/* TODO: movies liked */}
        <div className='my-6 text-xl font-bold'>Movies liked: 0</div>
      </div>
    </div>
  );
};

export { ProfilePage };
