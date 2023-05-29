import axios from 'axios';
import React, { useEffect } from 'react';

import { tmdbKey } from '@/config';

export const TestPage = (): JSX.Element => {
  useEffect(() => {
    void (async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${tmdbKey}`
      );
      console.log(res.data);
    })();
  }, []);
  return <div>TestPage</div>;
};
