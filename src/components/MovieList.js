//import components
import React, { useEffect, useState } from "react";
import Poster from "./Poster.component";
import { Container } from "react-bootstrap";
import Inputfield from "./Inputfield.component";
import Movie from "./Movie.component";
//import other
import axios from "axios";
import { tmdbKey, backendURL } from "./sharedVariables";

const MovieList = () => {
  //db movies
  const [movies, setMovies] = useState([]);

  //TMDB movies
  const [movies2, setMovies2] = useState([]);

  //initial load
  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = () => {
    //reset movies
    setMovies([]);
    //should send new movie name, and user_id
    const headers = {
      "Content-Type": "application/json",
      token: localStorage.token,
    };
    axios
      .post(
        `${backendURL}getmovies`,
        {
          test: "test",
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        let tempArr = [];
        for (let i in response.data.rows) {
          tempArr.push(response.data.rows[i]);
        }
        setMovies(tempArr);
        for (let i in tempArr) {
          getDetails(tempArr[i].name);
        }
      });
  };

  const getDetails = (movie) => {
    //reset TMDB movies
    setMovies2([]);

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${movie}`
      )
      .then((res) => {
        //if unable to find the movie we will return the no poster image
        if (res.data.results.length === 0) {
          return;
        }
        let tempArr2 = [];
        tempArr2.push(res.data.results[0]);

        //redux

        setMovies2((x) => [...x, ...tempArr2]); //*deep copy
      });
  };

  const addMovie = (name) => {
    //should send new movie name, and user_id
    const headers = {
      "Content-Type": "application/json",
      token: localStorage.token,
    };
    axios
      .post(
        backendURL,
        {
          movie: name,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        // console.log(res);
        getMovies();
      });
  };

  //database movies
  const movieList = () => {
    console.log("movies", movies);
    return movies.map((e, i) => {
      return <Movie key={i} movies={e} getMovies={getMovies} />;
    });
  };

  //TMDB movies
  const popularList = () => {
    return movies2.map((e, i) => {
      return <Poster props={e} key={i} />;
    });
  };

  return (
    <>
      <Container className="mycontainer my-3">
        <h1 className="text-center fs-3 mt-2">Movies to watch:</h1>
        <Inputfield addMovie={addMovie} getMovies={getMovies} />
        <div className="text-center my-5">{movieList()}</div>
        <div className="text-center my-5">{popularList()}</div>
      </Container>
    </>
  );
};

export default MovieList;

//notes
//https://medium.com/@manjuladube/understanding-deep-and-shallow-copy-in-javascript-13438bad941c
