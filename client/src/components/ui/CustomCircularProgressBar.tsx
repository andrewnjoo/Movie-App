import React from 'react';
import { BsPercent } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export interface CustomCircularProgressBarProps {
  data: {
    vote_average: number;
  };
  transformData?: string;
  width?: string;
  textSize?: string;
}

function CustomCircularProgressBar({
  data,
  transformData = 'translate(8px, -10px)',
  width = 'w-8',
  textSize = 'text-xs',
}: CustomCircularProgressBarProps): JSX.Element {
  const voteAverage: any = (data.vote_average * 10).toFixed(0);
  return (
    <div className={width} style={{ transform: transformData }}>
      <CircularProgressbarWithChildren
        value={voteAverage}
        background
        styles={buildStyles({
          pathColor: data.vote_average > 7 ? '#39d07a' : '#d2d531',
          backgroundColor: 'black',
          trailColor: data.vote_average > 7 ? '#2da661' : '#a8aa27',
        })}
      >
        <span className={`align-center flex text-white ${textSize}`}>
          {voteAverage}
          <IconContext.Provider
            value={{
              size: '0.6em',
              style: { transform: 'translate(0px, 0.3em)' },
            }}
          >
            <BsPercent />
          </IconContext.Provider>
        </span>
      </CircularProgressbarWithChildren>
    </div>
  );
}

export default CustomCircularProgressBar;
