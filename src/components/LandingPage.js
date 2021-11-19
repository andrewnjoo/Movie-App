// import components
import React from "react";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Poster from "./Poster.component";
import {
  ScrollMenu,
  VisibilityContext,
} from "react-horizontal-scrolling-menu";

//import other
import useKeyPress from "react-use-keypress";
import { useGetMoviesQuery } from "./services/movies";

const LandingPage = () => {
  const [page, setPage] = useState(1);
  const { data } = useGetMoviesQuery(page);

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
  // useKeyPress("ArrowLeft", () => {
  //   decreasePage();
  // });

  function LeftArrow() {
    useKeyPress("ArrowLeft", () => {
      scrollToFirst()
    });
    const {
      getItemById,
      scrollToItem,
    } = React.useContext(VisibilityContext);

    const scrollToFirst = () =>
    {
      decreasePage()
      scrollToItem(getItemById(0), "smooth", "center");
    }

    return <button className="btn border-dark custombtn" onClick={scrollToFirst}>←</button>;
  }


  function RightArrow() {
    useKeyPress("ArrowRight", () => {
      scrollToFirst()
    });
    const {
      getItemById,
      scrollToItem,
    } = React.useContext(VisibilityContext);

    const scrollToFirst = () =>
    {
      setPage(page+1)
      scrollToItem(getItemById(0), "smooth", "center");
    }

    return <button className="btn border-dark custombtn" onClick={scrollToFirst}>→</button>;
  }

  return (
    <Container className="my-5 w-75">
      <h3 className="text-center">Popular Movies</h3>
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {data === undefined
          ? null
          : data.map((e, i) => {
              return <Poster props={e} key={i} itemId={i} />;
            })}
      </ScrollMenu>

      <div className="pagination">
        <div className="me-auto">page {page}</div>
        {/* <p style={{ display: page === 1 ? "none" : "block" }}>
          <a
            className="btn border-dark custombtn"
            onClick={() => {
              decreasePage();
            }}
          >
            ←
          </a>{" "}
        </p> */}
        {/* &nbsp; */}
        {/* <p>
          <button
            className="btn border-dark custombtn"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            →
          </button>
        </p> */}
      </div>
    </Container>
  );
};

export default LandingPage;
