// import components
import React from "react";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Poster from "./Poster.component";
//import other
import useKeyPress from "react-use-keypress";
import { useGetMoviesQuery } from "./services/movies";

const LandingPage = () => {
  const [page, setPage] = useState(1);
  const { data } = useGetMoviesQuery(page);

  const decreasePage = () => {
    if (page === 1) {
      return;
    } else {
      setPage(page - 1);
    }
  };

  // nav shortcuts
  useKeyPress("ArrowLeft", () => {
    decreasePage();
  });
  useKeyPress("ArrowRight", () => {
    setPage(page + 1);
  });

  // popular movies
  const popularList = () =>
    data === undefined
      ? null
      : data.map((e, i) => {
          return <Poster props={e} key={i} />;
        });

  return (
    <Container className="my-5 w-75 text-center">
      <h3 className="text-center">Popular Movies</h3>
      <div>page {page}</div>
      <button
        className="btn btn-info border border-dark"
        onClick={() => {
          decreasePage();
        }}
      >
        &lt;
      </button>{" "}
      &nbsp;
      <button
        className="btn btn-info border border-dark"
        onClick={() => {
          setPage(page + 1);
        }}
      >
        &gt;
      </button>
      <div className="text-center my-5">{popularList()}</div>
    </Container>
  );
};

export default LandingPage;
