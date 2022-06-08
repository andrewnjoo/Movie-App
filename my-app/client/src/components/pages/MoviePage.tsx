import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import MovieHero from '../ui/MovieHero';
import tmdbKey from '../../sharedVariables';

function MoviePage() {
  // eslint-disable-next-line
  const { id } = useParams();
  // eslint-disable-next-line
  const history = useNavigate();
  const location = useLocation();

  // eslint-disable-next-line
  const [movieData, setMovieData] = React.useState({});

  React.useEffect(() => {
    (async () => {
      const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbKey}`);
      setMovieData(data);
      if (!location.pathname.includes('-')) {
        history(`../movie/${id}-${data.title.replace(/:/g, '').replace(/\s/g, '-').toLowerCase()}`);
      }
    })();
  }, [id]);

  return (
    <div>

      <section className="flex my-12">
        <MovieHero data={movieData} />
      </section>
    </div>
  );
}

export default MoviePage;
