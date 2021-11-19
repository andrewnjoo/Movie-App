// import components
import React from "react";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Poster from "./Poster.component";

//import other
import useKeyPress from "react-use-keypress";
import { useGetTvQuery } from "./services/television";

const Television = () => {
  const [page, setPage] = useState(1);
  const { data } = useGetTvQuery(page);

  useEffect(() => {
    console.log(data);
  }, [data]);

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

  return (
    <Container className="my-5 w-75">
      <h3 className="text-center">Popular TV Shows</h3>
      <div
        id="movielist"
        style={{
          overflow: "auto",
          whiteSpace: "nowrap",
          scrollBehavior: "smooth",
        }}
      >
        {data === undefined
          ? null
          : data.map((e, i) => {
              return <Poster props={e} key={i} itemId={i} />;
            })}
      </div>

      <div className="pagination">
        <div className="me-auto">page {page}</div>
        <p style={{ display: page === 1 ? "none" : "block" }}>
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

export default Television;
