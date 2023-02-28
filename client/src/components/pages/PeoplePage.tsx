import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { tmdbKey } from '../../config';
import Person from '../ui/Person';

export default function PeoplePage() {
  const [state, setState] = useState([]);
  useEffect(() => {
    (async () => {
      const {
        data: { results },
      } = await axios.get(
        `https://api.themoviedb.org/3/person/popular?api_key=${tmdbKey}&language=en-US&page=1`,
      );
      console.log(results);
      setState(results);
    })();
  }, []);

  return (
    <div className='grid sm:grid-cols-3 lg:grid-cols-5 gap-x-5 place-items-center my-16'>
      {state.map((item) => (
        <Person data={item} />
      ))}
    </div>
  );
}
