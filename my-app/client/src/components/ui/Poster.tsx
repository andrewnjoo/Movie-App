/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { AiOutlineYoutube } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import axios from 'axios';
import CustomCircularProgressBar from './CustomCircularProgressBar';
import TrailerModal from './TrailerModal';
import tmdbKey from '../../sharedVariables';

export default function Poster({ data, movie }) {
  const [open, setOpen] = useState(false);
  const [trailer, setTrailer] = useState('');

  useEffect(() => {
    (async () => {
    // get trailer
      const res2 = await axios.get(`https://api.themoviedb.org/3/${movie ? 'movie' : 'tv'}/${data.id}/videos?api_key=${tmdbKey}&language=en-US`);
      setTrailer(res2.data.results.filter((item) => item.type === 'Trailer')[0]?.key);
    })();
  }, [data]);

  return (
    <div key={data.id} className="w-48 mx-4" style={{ minWidth: '150px' }}>
      {/* Movie Poster */}
      <a href={movie ? `movie/${data.id}` : `tv/${data.id}`}>
        <img
          className="m-auto object-cover w-full rounded"
          src={data?.poster_path ? `https://image.tmdb.org/t/p/original/${data?.poster_path}` : 'https://i.stack.imgur.com/6M513.png'}
          alt="Movie Poster"
          style={{ minHeight: '225px', maxWidth: '150px' }}
        />
      </a>
      <div className="flex justify-between">
        {/* Movie Score */}
        <CustomCircularProgressBar data={data} />
        {/* Trailer Preview */}
        {trailer && (
          <IconContext.Provider value={{ size: '1.4em' }}>
            <button type="button" onClick={() => setOpen(true)}>
              <AiOutlineYoutube />
            </button>
            <TrailerModal open={open} setOpen={setOpen} trailer={trailer} />
          </IconContext.Provider>
        )}
      </div>
      {/* Title and Release Date */}
      <div className="pt-1 px-2.5 pb-3" id="content">
        <a href={`movie/${data.id}`}>
          <div className="text-sm font-bold">{data.title || data.name }</div>
        </a>
        <div className="text-sm">{moment(data.release_date).format('DD MMM YYYY')}</div>
      </div>
    </div>
  );
}

Poster.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    name: PropTypes.string,
  }),
  movie: PropTypes.bool,
};

Poster.defaultProps = {
  data: {
    id: 0,
    title: '',
    poster_path: '',
    release_date: '',
    vote_average: 0,
  },
};
