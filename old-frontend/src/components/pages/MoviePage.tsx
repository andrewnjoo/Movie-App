/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import MovieHero from '../ui/MovieHero';
import tmdbKey from '../../sharedVariables';

function MoviePage({ movie = true }) {
  const [movieData, setMovieData] = useState({});
  const [trailer, setTrailer] = useState('');
  const [state, setState] = useState({ runOnce: false });
  const { id } = useParams();
  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      // get movie info
      const res = await axios.get(`https://api.themoviedb.org/3/${movie ? 'movie' : 'tv'}/${id}?api_key=${tmdbKey}`);
      setMovieData(res.data);
      // get trailer
      const res2 = await axios.get(`https://api.themoviedb.org/3/${movie ? 'movie' : 'tv'}/${id}/videos?api_key=${tmdbKey}&language=en-US`);
      setTrailer(res2.data.results.filter((item) => item.type === 'Trailer')[0]?.key);
      // add title to history
      const temp = (res.data.title || res.data.name).replace(/:/g, '').replace(/\s/g, '-').toLowerCase();
    })();
  }, [id]);

  return (
    <div>
      <section className='flex my-12'>
        <MovieHero
          data={movieData}
          trailer={trailer}
        />
      </section>
    </div>
  );
}

MoviePage.propTypes = {
  movie: PropTypes.bool,
};

export default MoviePage;
