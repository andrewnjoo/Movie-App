import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { tmdbKey } from '../../config';

export default function PersonPage(): JSX.Element {
  const { id } = useParams();
  const [state, setState] = React.useState<any>(null);
  useEffect(() => {
    void (async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/person/${id}?api_key=${tmdbKey}&language=en-US`,
      );
      // console.log(data);
      setState(data);
    })();
  }, [id]);
  return (
    <div className='flex flex-col md:flex-row my-12'>
      {/* Left Column */}
      <div className='px-3 mx-auto'>
        <img
          className='object-cover w-full rounded-xl'
          src={`https://image.tmdb.org/t/p/original${state?.profile_path}`}
          alt='Headshot'
          style={{ width: '300px', minWidth: '300px' }}
        />
      </div>
      {/* Right Column */}
      <div
        className='px-4 my-3 mx-auto md:text-left text-center'
        style={{ maxWidth: '70%' }}
      >
        {/* Heading */}
        <div className='text-3xl font-bold'>{`${state?.name}`}</div>
        {/* Biography */}
        <div className='mt-6'>
          <div className='font-bold mb-3'>Biography</div>
          {state?.biography}
        </div>
      </div>
    </div>
  );
}
