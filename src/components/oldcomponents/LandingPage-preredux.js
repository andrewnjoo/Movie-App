// import components
import React from "react";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Poster from "../Poster.component";
//import other
import axios from "axios";
import useKeyPress from "react-use-keypress";
import { tmdbKey } from "../sharedVariables";
import { useSelector, useDispatch } from "react-redux";
import { addMovie } from "../../app/moviesSlice";

const LandingPage = () => {

  //redux
  const reduxMovies = useSelector((state) => state.movies.value);
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [counter, setCounter] = useState(1);

  // nav shortcuts
  useKeyPress("ArrowLeft", () => {
    increaseCounter(-1);
  });
  useKeyPress("ArrowRight", () => {
    increaseCounter(1);
  });

  //test
  useKeyPress("ArrowUp", () => {
    console.log(reduxMovies)
  });

  // initial load
  useEffect(() => {
    getPopular();
  }, []);

  // if movies change
  useEffect(() => {
    console.log(movies);
  }, [movies]);

  // if counter changes, get movies
  useEffect(() => {
    // console.log("counter", counter);
    getPopular();
  }, [counter]);

  const getPopular = async () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbKey}&language=en-US&page=${counter}`
      )
      .then((res) => {
        setMovies(res.data.results);
        //redux here

      });
  };

  const popularList = () => {
    console.log('movies',movies)
    return movies.map((e, i) => {
      return <Poster props={e} key={i} />;
    });
  };

  const increaseCounter = (num) => {
    if (counter === 1 && num === -1) {
      console.log("not allowed");
      return;
    }
    console.log("counter is", counter, "num is", num, counter + num);
    setCounter(counter + num);
    console.log("new counter is", counter);
  };

  return (
    <Container className="my-5 w-75 text-center">
      <h3 className="text-center">Popular Movies</h3>
      <div>page {counter}</div>
      <button
        className="btn btn-info border border-dark"
        onClick={() => {
          increaseCounter(-1);
        }}
      >
        &lt;
      </button>{" "}
      &nbsp;
      <button
        className="btn btn-info border border-dark"
        onClick={() => {
          increaseCounter(1);
        }}
      >
        &gt;
      </button>
      <div className="text-center my-5">{popularList()}</div>
    </Container>
  );
};

export default LandingPage;
