import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tmdbKey } from '../config';
import type {
  GetMoviesReq,
  GetMoviesRes,
  GetTVReq,
  GetTVRes,
} from '../types/api';

export const moviesApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({
    getMovies: builder.query<GetMoviesRes, GetMoviesReq>({
      query: (page = 1) =>
        `/movie/popular?api_key=${tmdbKey}&language=en-US&page=${String(page)}`,
      transformResponse: (response: any) => response.results,
    }),
    getTV: builder.query<GetTVRes, GetTVReq>({
      query: (page = 1) =>
        `/tv/popular?api_key=${tmdbKey}&language=en-US&page=${String(page)}`,
      transformResponse: (response: any) => response.results,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMoviesQuery, useGetTVQuery } = moviesApi;
