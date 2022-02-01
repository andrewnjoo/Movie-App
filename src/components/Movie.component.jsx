// import dependencies
import React, { useState, useEffect } from 'react';
import { useCaretPosition } from 'react-use-caret-position';
import axios from 'axios';
import { backendURL } from './sharedVariables';

function Movie2({ movies, getMovies }) {
  const [name, setName] = useState('');
  const [id, setId] = useState(movies.id);
  const { ref: inputRef, updateCaret } = useCaretPosition();

  // initial load
  useEffect(() => {
    // console.log('props', movies);
    if (movies == null) {
      console.log('no movies');
    } else {
      setName(movies.name);
      setId(movies.id);
    }
  }, []);

  // edit state but dont get movies with axios
  const editName = (newname) => {
    setName(newname);
  };

  const editMovie = (movieId, movieName) => {
    axios
      .put(backendURL, {
        id: movieId,
        name: movieName,
      })
      .then(() => {
        // console.log(res.data);
        getMovies();
      });
  };

  const deleteMovie = (movieId) => {
    axios
      .delete(backendURL, {
        data: {
          id: movieId,
        },
      })
      .then(() => {
        getMovies();
      });
  };

  const handleChange = (e) => {
    editName(e.target.value);
    updateCaret();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('enter pressed');
      editMovie(id, name);
    }
  };

  return (
    <div className="mx-auto text-center" style={{ width: '100%' }}>
      <input
        ref={inputRef}
        className="text-center movielistinput"
        onChange={handleChange}
        value={name}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        onClick={() => {
          deleteMovie(id);
        }}
      >
        x
      </button>
    </div>
  );
}

export default Movie2;
