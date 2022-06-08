import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import MovieHero from '../ui/MovieHero';
import tmdbKey from '../../sharedVariables';

function MoviePage({ movie = true }) {
  const { id } = useParams();
  const history = useNavigate();
  const location = useLocation();
  const [movieData, setMovieData] = useState({});
  const [trailer, setTrailer] = useState('');

  useEffect(() => {
    // get movie details
    (async () => {
      const { data } = await axios.get(`https://api.themoviedb.org/3/${movie ? 'movie' : 'tv'}/${id}?api_key=${tmdbKey}`);
      setMovieData(data);
      if (!location.pathname.includes('-')) {
        history(`../movie/${id}-${data.title.replace(/:/g, '').replace(/\s/g, '-').toLowerCase()}`);
      }
    })();
    // get trailer
    (async () => {
      const { data } = await axios.get(`https://api.themoviedb.org/3/${movie ? 'movie' : 'tv'}/${id}/videos?api_key=${tmdbKey}&language=en-US`);
      setTrailer(data.results.filter((item) => item.type === 'Trailer')[0].key);
    })();
  }, [id]);

  return (
    <div>
      <section className="flex my-12">
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
