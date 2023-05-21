import { Pagination, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

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
          {data?.map((element: any) => (
            <Poster
              data={element}
              movie={movie}
              key={element.id}
              // isFetching={isFetching}
            />
          ))}
        </div>
        <Pagination count={10} onChange={handleChange} />
      </ScrollContainer>
    </>
  );
}

export { Home };
