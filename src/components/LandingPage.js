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

  useEffect(()=>{
    console.log(data)
  },[data])

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
    <Container className="my-5 w-75">
      <h3 className="text-center">Popular Movies</h3>

      <div className="text-center mt-5">{popularList()}</div>
      <div className="pagination">
        <div className="me-auto">page {page}</div>
        
        <p style={{display: page === 1 ? 'none' : 'block'}}>
          <a
            className="btn border-dark custombtn"
            onClick={() => {
              decreasePage();
            }}
          >
            ←
          </a>{" "}
        </p>
        &nbsp;
        <p>
          <a
            className="btn border-dark custombtn"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            →
          </a>
        </p>
      </div>
    </Container>
  );
};

export default LandingPage;
