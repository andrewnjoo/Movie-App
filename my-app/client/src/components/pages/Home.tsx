// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
    <ScrollContainer className="scroll-container py-12 lg:mx-24">
      <div className="flex">
        {data?.map((element) => (
          <Poster
            data={element}
            movie={movie}
          />
        ))}
      </div>
    </ScrollContainer>
  );
}

Home.propTypes = {
  movie: PropTypes.bool,
};

export default Home;
