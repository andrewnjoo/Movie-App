import { Skeleton } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineYoutube } from 'react-icons/ai';
import { v4 as uuid } from 'uuid';

import type { Movie, Tv } from '#/types';
import CustomCircularProgressBar from './CustomCircularProgressBar';
import TrailerModal from './TrailerModal';

const tmdbKey = import.meta.env.VITE_TMDB_KEY;

export interface PosterProps {
  data: Movie | Tv | Record<string, unknown>;
  isFetching: boolean;
  movie: boolean;
  search?: boolean;
}

export function Poster({
  data,
  isFetching,
  movie,
  search = false,
}: PosterProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [trailer, setTrailer] = useState('');

  useEffect(() => {
    void (async () => {
      // TODO: use redux hook to get trailer
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

  const href = movie ? `movies/${data.id}` : `tv/${data.id}`;

  return (
    <div
      key={uuid()}
      className="mx-4"
      style={{ minWidth: '150px', width: search ? '150px' : '' }}
    >
      {/* Movie Poster */}
      <a href={href}>
        {isFetching ? (
          <Skeleton
            className="mx-4"
            height={225}
            variant="rounded"
            sx={{ minWidth: 150 }}
          />
        ) : (
          <img
            alt="Movie Poster"
            className="media-poster m-auto w-full rounded object-cover"
            loading="lazy"
            src={
              data?.poster_path
                ? `https://image.tmdb.org/t/p/original/${String(
                    data?.poster_path
                  )}`
                : 'https://i.stack.imgur.com/6M513.png'
            }
            style={{ minHeight: '225px', maxWidth: '150px' }}
          />
        )}
      </a>
      <div className="flex justify-between">
        {/* Movie Score */}
        {isFetching ? (
          <Skeleton variant="circular" width={32} height={32} />
        ) : (
          <CustomCircularProgressBar data={data} />
        )}
        {/* Trailer Preview */}
        <IconContext.Provider value={{ size: '1.4em' }}>
          <button
            type="button"
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
      <div className="px-2.5 pt-1 pb-3" id="content">
        <a href={href}>
          <div className="overflow-clip text-sm font-bold">
            {/* @ts-expect-error title not in tv type, name not in movie type */}
            {isFetching ? <Skeleton variant="text" /> : data.title || data.name}
          </div>
        </a>
        <div className="text-sm">
          {isFetching ? (
            <Skeleton variant="text" />
          ) : (
            // @ts-expect-error release_date not in tv type, first_air_date not in movie type
            moment(data.release_date || data.first_air_date).format(
              'DD MMM YYYY'
            )
          )}
        </div>
      </div>
    </div>
  );
}
