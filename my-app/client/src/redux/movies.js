// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbKey = '7aa9ec6612579e4bfd39288619de239c';

// Define a service using a base URL and expected endpoints
export const moviesApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/movie/' }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: (page = 1) => `popular?api_key=${tmdbKey}&language=en-US&page=${page}`,
      transformResponse: (response) => response.results,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMoviesQuery } = moviesApi;
