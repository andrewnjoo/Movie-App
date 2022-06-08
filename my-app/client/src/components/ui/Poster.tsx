import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Poster({ data }) {
  return (
    <div key={data.id} className="w-full mx-4" style={{ minWidth: '150px' }}>
      <a href={`movie/${data.id}`}>
        <img
          className="m-auto object-cover w-full rounded"
          src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
          alt="Movie Poster"
        />
      </a>
      <div className="flex">
        <div className="w-8" style={{ transform: 'translate(8px, -10px)' }}>
          <CircularProgressbar value={data.vote_average * 10} styles={buildStyles({ pathColor: data.vote_average > 7 ? '#39d07a' : '#d2d531' })} />
        </div>
        <p className="ml-3 text-sm">
          {data.vote_average * 10}
          %
        </p>
      </div>
      <div className="pt-1 px-2.5 pb-3" id="content">
        <a href={`movie/${data.id}`}>
          <div className="text-sm font-bold">{data.title}</div>
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
  }),
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

export default Poster;
