// import components
import React from "react";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Poster from "./Poster.component";
//import other
import useKeyPress from "react-use-keypress";
import { useGetMoviesQuery } from "./services/movies";

const LandingPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const { data } = useGetMoviesQuery(page);

  //check if data changed
  useEffect(() => {
    console.log(data);
    setMovies(data);
  }, [data]);

  // nav shortcuts
  useKeyPress("ArrowLeft", () => {
    increasePage(-1);
  });
  useKeyPress("ArrowRight", () => {
    increasePage(1);
  });

  //increase/decrease page function
  const increasePage = (num) => {
    if (page + num === 0) {
      console.log("not allowed");
      return;
    }
    setPage(page + num);
  };

  // popular movies
  const popularList = () => {
    if (data === undefined) {
      return;
    }
    return data.map((e, i) => {
      return <Poster props={e} key={i} />;
    });
  };

  return (
    <Container className="my-5 w-75 text-center">
      <h3 className="text-center">Popular Movies</h3>
      <div>page {page}</div>
      <button
        className="btn btn-info border border-dark"
        onClick={() => {
          setPage(page+1);
        }}
      >
        &lt;
      </button>{" "}
      &nbsp;
      <button
        className="btn btn-info border border-dark"
        onClick={() => {
          setPage(page-1);
        }}
      >
        &gt;
      </button>
      <div className="text-center my-5">{popularList()}</div>
    </Container>
  );
};

export default LandingPage;
