import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import tmdbKey from '../../sharedVariables';

export default function PersonPage() {
  // call this
  const { id } = useParams();
  const [state, setState] = React.useState(null);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${tmdbKey}&language=en-US`);
      console.log(data);
      setState(data);
    })();
  }, [id]);
  return (
    <div className="flex my-12">
      <div key={state?.id} className="mx-4" style={{ width: '300px' }}>
        <img
          className="m-auto object-cover w-full rounded"
          src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${state?.profile_path}`}
          alt="Headshot"
        />
      </div>
      <div className="w-full px-4">
        {/* Heading */}
        <div className="text-3xl font-bold">
          {`${state?.name}`}
        </div>
        {/* Biography */}
        <div className="mt-6">
          <div className="font-bold mb-3">
            Biography
          </div>
          {state?.biography}
        </div>
      </div>
    </div>
  );
}
