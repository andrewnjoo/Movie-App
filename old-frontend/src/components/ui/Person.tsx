/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
export default function Person({ data }) {
  //   console.log(data);
  return (
    <div className='text-center bg-zinc-200 my-2 rounded-md'>
      <a href={`/person/${data.id}`}>
        <img
          src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${data.profile_path}`}
          alt='profile pic'
          style={{ width: '200px' }}
        />
      </a>
      <div className='my-2'>{data.name}</div>
    </div>
  );
}

Person.propTypes = {
  data: PropTypes.object,
};
