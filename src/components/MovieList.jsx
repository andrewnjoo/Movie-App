// import components
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import Poster from './Poster.component';
import InputField from './InputField.component';
import Movie from './Movie.component';
// import other
import { tmdbKey, backendURL } from './sharedVariables';

function MovieList() {
  // db movies
  const [movies, setMovies] = useState([]);

  // TMDB movies
  const [movies2, setMovies2] = useState([]);

  const getDetails = (movie) => {
    // reset TMDB movies
    setMovies2([]);

    axios
      .get(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${movie}`)
      .then((res) => {
        // if unable to find the movie we will return the no poster image
        if (res.data.results.length === 0) {
          return;
        }
        const tempArr2 = [];
        tempArr2.push(res.data.results[0]);

        // redux

        setMovies2((x) => [...x, ...tempArr2]); //* deep copy
      });
  };

  const getMovies = () => {
    // reset movies
    setMovies([]);
    // should send new movie name, and user_id
    const headers = {
      'Content-Type': 'application/json',
      token: localStorage.token,
    };
    axios
      .post(
        `${backendURL}getmovies`,
        {
          test: 'test',
        },
        {
          headers,
        },
      )
      .then((response) => {
        const tempArr = [];
        for (let i = 0; i < response.data.rows.length; i += 1) {
          tempArr.push(response.data.rows[i]);
        }
        setMovies(tempArr);
        for (let j = 0; j < tempArr.length; j += 1) {
          getDetails(tempArr[j].name);
        }
      });
  };

  // initial load
  useEffect(() => {
    getMovies();
  }, []);

  const addMovie = (name) => {
    // should send new movie name, and user_id
    const headers = {
      'Content-Type': 'application/json',
      token: localStorage.token,
    };
    axios
      .post(
        backendURL,
        {
          movie: name,
        },
        {
          headers,
        },
      )
      .then(() => {
        // console.log(res);
        getMovies();
      });
  };

  // database movies
  const movieList = () => {
    console.log('movies', movies);
    return movies.map((e) => (
      <Movie
    // key={i}
        movies={e}
        getMovies={getMovies}
      />
    ));
  };

  // TMDB movies
  const popularList = () => movies2.map((e) => (
    <Poster props={e} />
  ));

  return (
    <Container className="mycontainer my-3">
      <h1 className="text-center fs-3 mt-2">Movies to watch:</h1>
      <InputField addMovie={addMovie} getMovies={getMovies} />
      <div className="text-center my-5">{movieList()}</div>
      <div className="text-center my-5">{popularList()}</div>
    </Container>
  );
}

export default MovieList;

// notes
// https://medium.com/@manjuladube/understanding-deep-and-shallow-copy-in-javascript-13438bad941c
