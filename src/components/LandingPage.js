// import components
import React from "react";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Poster from "./Poster.component";
//import other
import axios from "axios";
import useKeyPress from "react-use-keypress";
import { tmdbKey } from "./sharedVariables";
import { useGetMoviesQuery } from "./services/movies";
import Reduxtest from "./oldcomponents/Reduxtest";

const LandingPage = () => {

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetMoviesQuery(page);

  useEffect(() => {
    console.log(data)
    setMovies(data)
  }, [data]);

  // nav shortcuts
  useKeyPress("ArrowLeft", () => {
    increasePage(-1);
  });
  useKeyPress("ArrowRight", () => {
    increasePage(1);
  });

  const increasePage = (num) => {
    if (page + num === 0) {
      console.log("not allowed");
      return;
    }
    setPage(page + num);
  };

  // if movies change
  useEffect(() => {
    console.log('movies',movies);
  }, [movies]);

  // popular movies
  const popularList = () => {
    return data.results.map((e,i) => {
      return <Poster props={e} key={i} />
    })
  };


  return (
    <Container className="my-5 w-75 text-center">
      <h3 className="text-center">Popular Movies</h3>
      <div>page {page}</div>
      <button
        className="btn btn-info border border-dark"
        onClick={() => {
          increasePage(-1);
        }}
      >
        &lt;
      </button>{" "}
      &nbsp;
      <button
        className="btn btn-info border border-dark"
        onClick={() => {
          increasePage(1);
        }}
      >
        &gt;
      </button>
      <div className="text-center my-5">{popularList()}</div>

    </Container>
  );
};

export default LandingPage;
