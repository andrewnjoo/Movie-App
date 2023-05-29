import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Tv } from '#/types';
import { tmdbApi, tmdbKey } from '@/config';
import type { GetTVReq, GetTVRes } from '@/types';

export const tvApi = createApi({
  reducerPath: 'tmdbTvApi',
  baseQuery: fetchBaseQuery({ baseUrl: tmdbApi }),
  endpoints: (builder) => ({
    getTV: builder.query<GetTVRes, GetTVReq>({
      query: (page = 1) =>
        `discover/tv/?api_key=${tmdbKey}&include_adult=false&with_origin_country=US&language=en-US&page=${String(
          page
        )}`,
      transformResponse: ({ results }: { results: Tv[] }) => results,
    }),
  }),
});

export const { useGetTVQuery } = tvApi;
