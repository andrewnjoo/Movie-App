import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Poster({ data }) {
  return (
    <div key={data.id} className="w-60 mx-4" style={{ minWidth: '150px' }}>
      <img
        className="m-auto object-cover w-full h-56 rounded"
        src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
        alt="Movie Poster"
      />
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

        <div className="text-sm font-bold">{data.title}</div>
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

export default Poster;
