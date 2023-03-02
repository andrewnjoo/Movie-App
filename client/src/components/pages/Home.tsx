import React, { useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { useGetMoviesQuery, useGetTVQuery } from '../../redux/movies';
import Poster from '../ui/Poster';

function Home({ movie = true }): JSX.Element {
  const [data, setData] = useState([]);
  const reduxDataPage1 = movie ? useGetMoviesQuery(1) : useGetTVQuery(1);
  const reduxDataPage2 = movie ? useGetMoviesQuery(2) : useGetTVQuery(2);
  const reduxDataPage3 = movie ? null : useGetTVQuery(3);

  const getEnglishMedia = (data: any): any => {
    return (
      data?.data?.filter((item: any) => item.original_language === 'en') || []
    );
  };

  useEffect(() => {
    const combinedData: any = [
      ...getEnglishMedia(reduxDataPage1),
      ...getEnglishMedia(reduxDataPage2),
      ...getEnglishMedia(reduxDataPage3),
    ];
    setData(combinedData);
  }, [reduxDataPage1, reduxDataPage2, reduxDataPage3]);

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

export { Home };
