import React, { useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { useGetMoviesQuery, useGetTVQuery } from '../../redux/movies';
import Poster from '../ui/Poster';

function Home({ movie = true }): JSX.Element {
  const [data, setData] = useState([]);
  const reduxDataPage1 = movie ? useGetMoviesQuery(1) : useGetTVQuery(1);
  const reduxDataPage2 = movie ? useGetMoviesQuery(2) : useGetTVQuery(2);

  useEffect(() => {
    const combinedData: any = [
      ...(reduxDataPage1?.data?.filter(
        (item: any) => item.original_language === 'en',
      ) || []),
      ...(reduxDataPage2?.data?.filter(
        (item: any) => item.original_language === 'en',
      ) || []),
    ];
    setData(combinedData);
  }, [reduxDataPage1, reduxDataPage2]);

  return (
    <ScrollContainer
      className='scroll-container py-12 lg:mx-24'
      horizontal
      hideScrollbars={false}
    >
      <div className='flex'>
        {data?.map((element: any) => (
          <Poster data={element} movie={movie} key={element.id} />
        ))}
      </div>
    </ScrollContainer>
  );
}

export default Home;
