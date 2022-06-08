/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CustomCircularProgressBar from './CustomCircularProgressBar';

export default function Poster({ data, movie }) {
  return (
    <div key={data.id} className="w-full mx-4" style={{ minWidth: '150px' }}>
      <a href={movie ? `movie/${data.id}` : `tv/${data.id}`}>
        <img
          className="m-auto object-cover w-full rounded"
          src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
          alt="Movie Poster"
          style={{ minHeight: '225px' }}
        />
      </a>
      <div className="flex">
        <CustomCircularProgressBar data={data} />
      </div>
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
