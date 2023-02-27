/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import ScrollContainer from 'react-indiana-drag-scroll';
import tmdbKey from '../../sharedVariables';
import Poster from '../ui/Poster';
import Person from '../ui/Person';

export default function SearchPage() {
  //   movie, tv, person
  const [type, setType] = useState(null);
  const [state, setState] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    setType(searchParams.get('type'));
  }, [searchParams]);

  useEffect(() => {
    if (type) {
      (async () => {
        const {
          data: { results },
        } = await axios.get(
          `https://api.themoviedb.org/3/search/${type}?api_key=${tmdbKey}&query=${searchParams.get(
            'query',
          )}&language=en-US&page=1`,
        );
        console.log(results);
        setState(results);
      })();
    }
  }, [type]);

  return (
    <>
      {/* Left Column */}
      <div className='flex flex-col text-center'>
        <div className='text-2xl font-bold mt-6 mb-3'>Search</div>
        <div className='text-md'>
          <a
            className={`${
              searchParams.get('type') === 'movie'
                ? 'border-indigo-500'
                : 'border-transparent'
            } hover:text-sky-700 border-b-2 mx-1`}
            href={`/search?type=movie&query=${searchParams.get('query')}`}
          >
            Movies
          </a>
          <a
            className={`${
              searchParams.get('type') === 'tv'
                ? 'border-indigo-500'
                : 'border-transparent'
            } hover:text-sky-700 border-b-2 mx-1`}
            href={`/search?type=tv&query=${searchParams.get('query')}`}
          >
            TV
          </a>
          <a
            className={`${
              searchParams.get('type') === 'person'
                ? 'border-indigo-500'
                : 'border-transparent'
            } hover:text-sky-700 border-b-2 mx-1`}
            href={`/search?type=person&query=${searchParams.get('query')}`}
          >
            People
          </a>
        </div>
      </div>
      <ScrollContainer className='scroll-container py-12'>
        {/* Right Column */}
        <div className='grid sm:grid-cols-3 lg:grid-cols-5 place-items-center'>
          {state.map((item: any) => {
            if (type === 'person') {
              return <Person data={item} />;
            }
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
