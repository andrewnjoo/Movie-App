import React, { useState } from 'react';
// import { history } from 'react-router-dom';
import moment from 'moment';
import { BsFillPlayBtnFill } from 'react-icons/bs';
import CustomCircularProgressBar from './CustomCircularProgressBar';
import TrailerModal from './TrailerModal';

export default function MovieHero({
  data,
  trailer,
}: {
  data: any;
  trailer: string;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  return (
    <div className='flex w-full flex-col px-10 md:flex-row'>
      {data && (
        <>
          {/* Left Column / Poster */}
          <div className='mx-auto px-3' style={{ width: '300px' }}>
            <img
              className='m-auto mb-2 w-full rounded object-cover'
              src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
              alt='Movie Poster'
              style={{ minWidth: '300px' }}
            />
          </div>
          {/* Right Column / Info */}
          <div className='my-3 mx-auto ml-3 px-4 text-center md:text-left'>
            {/* Heading */}
            <div className='text-xl font-bold'>
              {`${data.title || data.name} (${moment(data.release_date).format(
                'YYYY',
              )})`}
            </div>
            {/* Subheading #1 */}
            <div>
              {`${moment(data.release_date).format('DD MMM YYYY')} • `}
              {data?.genres?.map((genre: any) => genre.name).join(', ')}
              {data.runtime
                ? ` • ${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
                : ''}
            </div>
            {/* Subheading #2 */}
            <div className='my-6 flex items-center justify-center md:justify-start'>
              <CustomCircularProgressBar
                transformData=''
                data={data}
                width='w-14'
                textSize='text-lg'
              />
              <div className='mx-4 w-6'>User Score</div>
              <button
                className='mx-6 flex w-32 items-center'
                type='button'
                onClick={() => {
                  setOpen(true);
                }}
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
