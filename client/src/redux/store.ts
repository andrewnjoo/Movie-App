import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { moviesApi, tvApi } from './';

const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    [tvApi.reducerPath]: tvApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(moviesApi.middleware)
      .concat(tvApi.middleware),
});

export const setupStore = (preloadedState = {}): any =>
  configureStore({
    reducer: {
      [moviesApi.reducerPath]: moviesApi.reducer,
      [tvApi.reducerPath]: tvApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(moviesApi.middleware)
        .concat(tvApi.middleware),
    preloadedState,
  });

setupListeners(store.dispatch);

export default store;
