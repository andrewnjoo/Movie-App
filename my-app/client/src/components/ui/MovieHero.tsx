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
    <div className="flex px-10">
      {data && (
        <>
          {/* Poster */}
          <div key={data.id} className="mx-4" style={{ width: '300px' }}>
            <img
              className="m-auto object-cover w-full rounded"
              src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${data.poster_path}`}
              alt="Movie Poster"
            />
          </div>
          <div className="w-full">
            {/* Heading */}
            <div>
              {`${data.title} (${moment(data.release_date).format('YYYY')})`}
            </div>
            {/* Subheading #1 */}
            <div>
              {moment(data.release_date).format('DD MMM YYYY')}
              &nbsp;•&nbsp;
              {data.genres?.map((genre, idx) => (idx !== data.genres.length - 1 ? `${genre.name}, ` : `${genre.name}`))}
              &nbsp;•&nbsp;
              {`${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`}
            </div>
            {/* Subheading #2 */}
            <div className="my-6 flex items-center">
              <CustomCircularProgressBar
                transformData=""
                data={data}
                width="w-14"
                textSize="text-lg"
              />
              <div className="w-6 mx-4">
                User Score
              </div>
              <button
                className="w-32 mx-6 flex items-center"
                type="button"
                onClick={() => setOpen(true)}
              >
                <BsFillPlayBtnFill className="mr-2" />
                Play Trailer
              </button>
              <TrailerModal
                open={open}
                setOpen={setOpen}
                trailer={trailer}
              />
            </div>
            {/* Tagline */}
            <div className="mt-4">
              <em>{data.tagline}</em>
            </div>
            {/* Description */}
            <div className="mt-4">
              <strong>Overview</strong>
              <br />
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
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    overview: PropTypes.string,
    tagline: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })),
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
