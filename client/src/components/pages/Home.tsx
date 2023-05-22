import { Pagination } from '@mui/material';
import React, { useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { v4 as uuid } from 'uuid';

import type { Movie, Tv } from '#/types';
import { Poster } from '@/components/ui/Poster';
import { useGetMoviesQuery, useGetTVQuery } from '@/redux';

function Home({ movie = true }): JSX.Element {
  const [page, setPage] = useState(1);
  const { data, isFetching } = movie
    ? useGetMoviesQuery(page)
    : useGetTVQuery(page);

  const handleChange = (_: any, value: number): void => {
    setPage(value);
  };

  return (
    <>
      <ScrollContainer
        className="scroll-container py-12 lg:mx-24"
        horizontal
        hideScrollbars={false}
      >
        <div className="flex">
          {isFetching
            ? Array.from(new Array(10)).map((_) => (
                <Poster data={{}} movie={movie} key={uuid()} isFetching />
              ))
            : data?.map((element: Movie | Tv) => (
                <Poster
                  data={element}
                  movie={movie}
                  key={uuid()}
                  isFetching={false}
                />
              ))}
        </div>
        <Pagination count={10} onChange={handleChange} />
      </ScrollContainer>
    </>
  );
}

export { Home };
