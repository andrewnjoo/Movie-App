import React, { useState } from 'react';
// import { history } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { BsFillPlayBtnFill } from 'react-icons/bs';
import CustomCircularProgressBar from './CustomCircularProgressBar';
import TrailerModal from './TrailerModal';

export default function MovieHero({ data, trailer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className='flex flex-col md:flex-row px-10 w-full'>
      {data && (
        <>
          {/* Left Column / Poster */}
          <div className='px-3 mx-auto' style={{ width: '300px' }}>
            <img
              className='m-auto mb-2 object-cover w-full rounded'
              src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
              alt='Movie Poster'
              style={{ minWidth: '300px' }}
            />
          </div>
          {/* Right Column / Info */}
          <div className='px-4 my-3 ml-3 mx-auto md:text-left text-center'>
            {/* Heading */}
            <div className='text-xl font-bold'>
              {`${data.title || data.name} (${moment(data.release_date).format(
                'YYYY',
              )})`}
            </div>
            {/* Subheading #1 */}
            <div>
              {`${moment(data.release_date).format('DD MMM YYYY')} • `}
              {data.genres && data.genres.map((genre) => genre.name).join(', ')}
              {data.runtime
                ? ` • ${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
                : ''}
            </div>
            {/* Subheading #2 */}
            <div className='my-6 flex justify-center md:justify-start items-center'>
              <CustomCircularProgressBar
                transformData=''
                data={data}
                width='w-14'
                textSize='text-lg'
              />
              <div className='w-6 mx-4'>User Score</div>
              <button
                className='w-32 mx-6 flex items-center'
                type='button'
                onClick={() => setOpen(true)}
              >
                <BsFillPlayBtnFill className='mr-2' />
                Play Trailer
              </button>
              <TrailerModal open={open} setOpen={setOpen} trailer={trailer} />
            </div>
            {/* Tagline */}
            <div className='mt-4'>
              <em>{data.tagline}</em>
            </div>
            {/* Description */}
            <div className='mt-4'>
              <div className='font-bold'>Overview</div>
              {data.overview}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

MovieHero.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    name: PropTypes.string,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    overview: PropTypes.string,
    tagline: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
    runtime: PropTypes.number,
  }),
  trailer: PropTypes.string,
};

MovieHero.defaultProps = {
  data: {
    id: 0,
    title: '',
    poster_path: '',
    release_date: '',
    vote_average: 0,
  },
};
