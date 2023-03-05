import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import ScrollContainer from 'react-indiana-drag-scroll';

import { tmdbKey } from '../../config';
import Poster from '../ui/Poster';
import Person from '../ui/Person';

function SearchPage(): JSX.Element {
  const [type, setType] = useState<any>(null);
  const [state, setState] = useState([]);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    setType(searchParams.get('type'));
  }, [searchParams]);

  useEffect(() => {
    if (type) {
      void (async () => {
        const {
          data: { results },
        } = await axios.get(
          `https://api.themoviedb.org/3/search/${type}?api_key=${tmdbKey}&query=${searchParams.get(
            'query',
          )}&language=en-US&page=1`,
        );
        setState(results);
      })();
    }
  }, [type]);

  return (
    <>
      {/* Left Column */}
      <div className='flex flex-col text-center'>
        <div className='mt-6 mb-3 text-2xl font-bold'>Search</div>
        <div className='text-md'>
          <a
            className={`${
              searchParams.get('type') === 'movie'
                ? 'border-indigo-500'
                : 'border-transparent'
            } mx-1 border-b-2 hover:text-sky-700`}
            href={`/search?type=movie&query=${searchParams.get('query')}`}
          >
            Movies
          </a>
          <a
            className={`${
              searchParams.get('type') === 'tv'
                ? 'border-indigo-500'
                : 'border-transparent'
            } mx-1 border-b-2 hover:text-sky-700`}
            href={`/search?type=tv&query=${searchParams.get('query')}`}
          >
            TV
          </a>
          <a
            className={`${
              searchParams.get('type') === 'person'
                ? 'border-indigo-500'
                : 'border-transparent'
            } mx-1 border-b-2 hover:text-sky-700`}
            href={`/search?type=person&query=${searchParams.get('query')}`}
          >
            People
          </a>
        </div>
      </div>
      <ScrollContainer className='scroll-container py-12'>
        {/* Right Column */}
        <div className='grid place-items-center sm:grid-cols-3 lg:grid-cols-5'>
          {state.map((item: any) => {
            if (type === 'person') {
              if (item.profile_path === null) return null;
              return <Person data={item} key={item.id} />;
            }
            if (item.poster_path === null) return null;
            return (
              <Poster
                data={item}
                movie={type === 'movie'}
                key={item.id}
                search
              />
            );
          })}
        </div>
      </ScrollContainer>
    </>
  );
}

export { SearchPage };
