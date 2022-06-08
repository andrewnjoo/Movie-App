/* eslint-disable no-unused-vars */
import React from 'react';
// import { history } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function MovieHero({ data }) {
  console.log('data', data);
  return (
    <div className="flex px-10">
      {data && (
        <>
          <div key={data.id} className="mx-4" style={{ width: '300px' }}>
            <img
              className="m-auto object-cover w-full rounded"
              src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${data.poster_path}`}
              alt="Movie Poster"
            />
          </div>
          <div className="w-full">
            {/* Title Element */}
            <div className="inline">
              {data.title}
              {' ('}
              {data.release_date?.substring(0, 4)}
              )
              <br />
              {moment(data.release_date).format('DD MMM YYYY')}
              {' '}
              •
              {'  '}
              {data.genres?.map((genre, idx) => (idx !== data.genres.length - 1 ? `${genre.name}, ` : `${genre.name}`))}
              {' '}
              •
              {'  '}
              {`${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`}
            </div>
            <div className="mt-4">
              <em>{data.tagline}</em>
              <br />
              <br />
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

export default MovieHero;
