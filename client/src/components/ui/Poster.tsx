import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { AiOutlineYoutube } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import axios from 'axios';
import CustomCircularProgressBar from './CustomCircularProgressBar';
import TrailerModal from './TrailerModal';
const tmdbKey = import.meta.env.VITE_TMDB_KEY;

export default function Poster({
  data,
  movie,
  search = false,
}: {
  data: any;
  movie: boolean;
  search?: boolean;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  const [trailer, setTrailer] = useState('');

  useEffect(() => {
    void (async () => {
      // get trailer
      const res2 = await axios.get(
        `https://api.themoviedb.org/3/${movie ? 'movie' : 'tv'}/${
          data.id
        }/videos?api_key=${tmdbKey}&language=en-US`,
      );
      setTrailer(
        res2.data.results.filter((item: any) => item.type === 'Trailer')[0]
          ?.key,
      );
    })();
  }, [data]);

  const href = movie ? `movies/${data.id}` : `tv/${data.id}`;

  return (
    <div
      key={data.id}
      className='mx-4'
      style={{ minWidth: '150px', width: search ? '150px' : '' }}
    >
      {/* Movie Poster */}
      <a href={href}>
        <img
          className='media-poster m-auto w-full rounded object-cover'
          src={
            data?.poster_path
              ? `https://image.tmdb.org/t/p/original/${data?.poster_path}`
              : 'https://i.stack.imgur.com/6M513.png'
          }
          alt='Movie Poster'
          style={{ minHeight: '225px', maxWidth: '150px' }}
        />
      </a>
      <div className='flex justify-between'>
        {/* Movie Score */}
        <CustomCircularProgressBar data={data} />
        {/* Trailer Preview */}
        <IconContext.Provider value={{ size: '1.4em' }}>
          <button
            type='button'
            disabled={!trailer}
            style={{ opacity: trailer ? 1 : 0.5 }}
            onClick={() => {
              setOpen(true);
            }}
          >
            <AiOutlineYoutube />
          </button>
          <TrailerModal open={open} setOpen={setOpen} trailer={trailer} />
        </IconContext.Provider>
      </div>
      {/* Title and Release Date */}
      <div className='px-2.5 pt-1 pb-3' id='content'>
        <a href={href}>
          <div className='overflow-clip text-sm font-bold'>
            {data.title || data.name}
          </div>
        </a>
        <div className='text-sm'>
          {moment(data.release_date).format('DD MMM YYYY')}
        </div>
      </div>
    </div>
  );
}
