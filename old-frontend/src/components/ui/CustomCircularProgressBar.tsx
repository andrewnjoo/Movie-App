/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import PropTypes from 'prop-types';
import { BsPercent } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CustomCircularProgressBar({
  data, transformData = 'translate(8px, -10px)', width = 'w-8', textSize = 'text-xs',
}) {
  return (
    <div className={width} style={{ transform: transformData }}>
      <CircularProgressbarWithChildren
        value={data.vote_average * 10}
        background
        styles={buildStyles({
          pathColor: data.vote_average > 7 ? '#39d07a' : '#d2d531',
          backgroundColor: 'black',
          trailColor: data.vote_average > 7 ? '#2da661' : '#a8aa27',
        })}
      >
        <span className={`flex align-center text-white ${textSize}`}>
          {data.vote_average * 10}
          <IconContext.Provider value={{ size: '0.6em', style: { transform: 'translate(0px, 0.3em)' } }}>
            <BsPercent />
          </IconContext.Provider>
        </span>
      </CircularProgressbarWithChildren>
    </div>
  );
}

CustomCircularProgressBar.propTypes = {
  textSize: PropTypes.string,
  width: PropTypes.string,
  transformData: PropTypes.string,
  data: PropTypes.shape({
    vote_average: PropTypes.number,
  }),
};

export default CustomCircularProgressBar;
