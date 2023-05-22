import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Movie } from '#/types';
import type { GetMoviesReq, GetMoviesRes } from '@/types';
import { tmdbApi, tmdbKey } from '../config';

export const moviesApi = createApi({
  reducerPath: 'tmdbMoviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: tmdbApi }),
  endpoints: (builder) => ({
    getMovies: builder.query<GetMoviesRes, GetMoviesReq>({
      query: (page = 1) =>
        `/discover/movie?api_key=${tmdbKey}&include_adult=false&with_origin_country=US&language=en-US&page=${String(
          page
        )}`,
      transformResponse: (response: any) =>
        response.results.filter(
          (movie: Movie) => movie.original_language === 'en'
        ),
    }),
  }),
});

export const { useGetMoviesQuery } = moviesApi;
