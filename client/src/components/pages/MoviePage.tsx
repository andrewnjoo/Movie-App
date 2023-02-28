import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import MovieHero from '../ui/MovieHero';
import { tmdbKey } from '../../config';

function MoviePage({ movie = true }): JSX.Element {
  const [movieData, setMovieData] = useState({});
  const [trailer, setTrailer] = useState('');
  const { id } = useParams();

  useEffect(() => {
    void (async () => {
      // get movie info
      const res = await axios.get(
        `https://api.themoviedb.org/3/${
          movie ? 'movie' : 'tv'
        }/${id}?api_key=${tmdbKey}`,
      );
      setMovieData(res.data);
      // get trailer
      const res2 = await axios.get(
        `https://api.themoviedb.org/3/${
          movie ? 'movie' : 'tv'
        }/${id}/videos?api_key=${tmdbKey}&language=en-US`,
      );
      setTrailer(
        res2.data.results.filter((item: any) => item.type === 'Trailer')[0]
          ?.key,
      );
    })();
  }, [id]);

  return (
    <div>
      <section className='flex my-12'>
        <MovieHero data={movieData} trailer={trailer} />
      </section>
    </div>
  );
}

export default MoviePage;
