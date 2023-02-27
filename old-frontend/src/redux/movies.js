// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import tmdbKey from '../sharedVariables';

// Define a service using a base URL and expected endpoints
export const moviesApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: (page = 1) => `/movie/popular?api_key=${tmdbKey}&language=en-US&page=${page}`,
      transformResponse: (response) => response.results,
    }),
    getTV: builder.query({
      query: (page = 1) => `/tv/popular?api_key=${tmdbKey}&language=en-US&page=${page}`,
      transformResponse: (response) => response.results,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMoviesQuery, useGetTVQuery } = moviesApi;
