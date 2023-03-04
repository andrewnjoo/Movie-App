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
    <div className='mt-10 mx-auto max-w-sm rounded overflow-hidden shadow-lg border border-gray-300'>
      <p className='text-gray-700 text-xl font-bold mb-2 m-6'>My Profile</p>
      <div className='px-6 py-4'>
        <div className='flex items-center mb-4'>
          <FaUserCircle className='text-4xl mr-4' />
          <div>
            <div className='font-bold text-xl mb-2'>{name}</div>
            <p className='text-gray-700 text-base'>{email}</p>
          </div>
        </div>
        {/* TODO: movies liked */}
        <div className='font-bold text-xl my-6'>Movies liked: 0</div>
      </div>
    </div>
  );
};

export { ProfilePage };
