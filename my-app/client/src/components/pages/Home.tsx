// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useGetMoviesQuery } from '../../redux/movies';
import Poster from '../ui/Poster';

function Home() {
  const [data, setData] = useState([]);
  const reduxData = useGetMoviesQuery(1);

  useEffect(() => {
    setData(reduxData.data);
    console.log(reduxData);
  }, [reduxData]);

  return (
    <ScrollContainer className="scroll-container py-12">
      <div className="flex">
        {data?.map((element) => (
          <Poster
            data={element}
          />
        ))}
      </div>
    </ScrollContainer>
  );
}

export default Home;
