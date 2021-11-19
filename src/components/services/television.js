// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { tmdbKey } from "../sharedVariables";

// Define a service using a base URL and expected endpoints
export const tvApi = createApi({
    reducerPath: 'tvApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/tv/' }),
    endpoints: (builder) => ({
      getTv: builder.query({
        query: (page = 1) => `popular?api_key=${tmdbKey}&language=en-US&page=${page}`,
        transformResponse: (response) => response.results,
      }),
    }),
  })

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTvQuery } = tvApi
