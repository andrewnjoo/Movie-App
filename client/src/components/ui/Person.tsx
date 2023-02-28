import React from 'react';

export default function Person({ data }: { data: any }) {
  return (
    <div className='text-center bg-zinc-200 my-2 rounded-md'>
      <a href={`/people/${data.id}`}>
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
