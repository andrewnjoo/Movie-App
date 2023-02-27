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
  movie: any;
  search?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [trailer, setTrailer] = useState('');

  useEffect(() => {
    (async () => {
      // get trailer
      const res2 = await axios.get(
        `https://api.themoviedb.org/3/${movie ? 'movie' : 'tv'}/${
          data.id
        }/videos?api_key=${tmdbKey}&language=en-US`
      );
      setTrailer(
        res2.data.results.filter((item: any) => item.type === 'Trailer')[0]?.key
      );
    })();
  }, [data]);

  return (
    <div
      key={data.id}
      className='mx-4'
      style={{ minWidth: '150px', width: search ? '150px' : '' }}
    >
      {/* Movie Poster */}
      <a href={movie ? `movie/${data.id}` : `tv/${data.id}`}>
        <img
          className='m-auto object-cover w-full rounded'
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
        {trailer && (
          <IconContext.Provider value={{ size: '1.4em' }}>
            <button type='button' onClick={() => setOpen(true)}>
              <AiOutlineYoutube />
            </button>
            <TrailerModal open={open} setOpen={setOpen} trailer={trailer} />
          </IconContext.Provider>
        )}
      </div>
      {/* Title and Release Date */}
      <div className='pt-1 px-2.5 pb-3' id='content'>
        <a href={`movie/${data.id}`}>
          <div className='text-sm font-bold overflow-clip'>
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
