import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { tmdbKey } from '../../config';

function PersonPage(): JSX.Element {
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
    <div className='my-12 flex flex-col md:flex-row'>
      {/* Left Column */}
      <div className='mx-auto px-3'>
        <img
          className='w-full rounded-xl object-cover'
          src={`https://image.tmdb.org/t/p/original${state?.profile_path}`}
          alt='Headshot'
          style={{ width: '300px', minWidth: '300px' }}
        />
      </div>
      {/* Right Column */}
      <div
        className='my-3 mx-auto px-4 text-center md:text-left'
        style={{ maxWidth: '70%' }}
      >
        {/* Heading */}
        <div className='text-3xl font-bold'>{`${state?.name}`}</div>
        {/* Biography */}
        <div className='mt-6'>
          <div className='mb-3 font-bold'>Biography</div>
          {state?.biography}
        </div>
      </div>
    </div>
  );
}

export { PersonPage };
