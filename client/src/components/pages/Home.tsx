import React, { useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { useGetMoviesQuery, useGetTVQuery } from '../../redux/movies';
import Poster from '../ui/Poster';

function Home({ movie = true }) {
  const [data, setData] = useState([]);
  const reduxData = movie ? useGetMoviesQuery(1) : useGetTVQuery(1);

  useEffect(() => {
    if (movie) {
      setData(reduxData.data);
    } else {
      setData(reduxData.data);
    }
    console.log(reduxData);
  }, [reduxData]);

  return (
    <ScrollContainer
      className='scroll-container py-12 lg:mx-24'
      horizontal
      hideScrollbars={false}
    >
      <div className='flex'>
        {data?.map((element) => (
          <Poster data={element} movie={movie} />
        ))}
      </div>
    </ScrollContainer>
  );
}

export default Home;
