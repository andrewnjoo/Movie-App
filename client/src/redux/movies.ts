import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Movie } from '#/types';
import { tmdbApi, tmdbKey } from '@/config';
import type { GetMoviesReq, GetMoviesRes } from '@/types';

export const moviesApi = createApi({
  reducerPath: 'tmdbMoviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: tmdbApi }),
  endpoints: (builder) => ({
    getMovies: builder.query<GetMoviesRes, GetMoviesReq>({
      query: (page = 1) =>
        `discover/movie?api_key=${tmdbKey}&include_adult=false&with_origin_country=US&language=en-US&page=${String(
          page
        )}`,
      transformResponse: ({ results }: { results: Movie[] }) =>
        results.filter((movie) => movie.original_language === 'en'),
    }),
  }),
});

export const { useGetMoviesQuery } = moviesApi;
