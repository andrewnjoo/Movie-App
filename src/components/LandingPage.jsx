/* eslint-disable no-unused-vars */
// import components
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import useKeyPress from 'react-use-keypress';
import axios from 'axios';
import Poster from './Poster.component';
import { useGetMoviesQuery } from './services/movies';
import { tmdbKey } from './sharedVariables';

function LandingPage() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  const reduxData = useGetMoviesQuery(page);
  useEffect(() => {
    if (reduxData.isSuccess) {
      const youtubeLinks = reduxData.data.map(async (movie) => {
        let temp = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${tmdbKey}&language=en-US`);
        temp = temp.data.results.filter((video) => video.type === 'Trailer');
        return temp[0]?.key || '';
      });
      Promise.all(youtubeLinks).then((values) => {
        const temp = reduxData.data.map((movie, idx) => ({ ...movie, youtubeLink: values[idx] }));
        setData(temp);
      });
    }
  }, [reduxData]);

  const decreasePage = () => {
    if (page === 1) {
      console.log('page is 1');
    } else {
      setPage(page - 1);
    }
  };

  const setZero = () => {
    document.getElementById('movielist').scrollLeft = 0;
  };

  // nav shortcuts
  useKeyPress('ArrowLeft', () => {
    setZero();
    decreasePage();
  });

  useKeyPress('ArrowRight', () => {
    setZero();
    setPage(page + 1);
  });

  return (
    <Container className="my-5 customcontainer">
      <h3 className="text-center">Popular Movies</h3>
      <div className="movie-grid" id="movielist">
        {data === undefined
          ? null
          : data.map((e, i) => <Poster props={e} key={e.id} itemId={i} />)}
      </div>

      <div className="pagination">
        <div className="me-auto">
          page&nbsp;
          {page}
        </div>
        <p style={{ display: page === 1 ? 'none' : 'block' }}>
          <button
            type="button"
            className="btn border-dark custombtn"
            onClick={() => {
              setZero();
              decreasePage();
            }}
          >
            ←
          </button>
          {' '}
        </p>
        &nbsp;
        <p>
          <button
            type="button"
            className="btn border-dark custombtn"
            onClick={() => {
              setZero();
              setPage(page + 1);
            }}
          >
            →
          </button>
        </p>
      </div>
    </Container>
  );
}

export default LandingPage;
