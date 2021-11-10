// import react
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import useKeypress from "react-use-keypress";
import { Doughnut } from "react-chartjs-2";

const Poster = (props) => {
  useKeypress("Enter", () => {
    handleClose();
  });
  let [show, setShow] = useState(false);
  let [src, setSrc] = useState("");
  let [data, setData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // console.log(props.props)
    const setImage = () => {
      if (props.props == null) {
        return;
      } else {
        setSrc(`https://image.tmdb.org/t/p/original${props.props.poster_path}`);
        setData(props.props);
      }
    };
    setImage();
  });

  const whichDonut = () => {
    if(data.vote_average===0){
      return
    }
    if(data.vote_average < 7 ){
      return (
        <Doughnut
            data={{
              labels: [""],
              datasets: [
                {
                  data: [data.vote_average * 10, 100 - data.vote_average * 10],
                  backgroundColor: ["rgba(202, 205, 47, 0.6)", "rgba(0,0,0,0)"],
                  borderColor: ["rgba(0, 0, 0, 0)", "rgba(0,0,0,0)"],
                },
              ],
            }}
            options = {{
              events:[],
              plugins: {
                legend: {
                  display: false
                }
              },
              maintainAspectRatio: false
            }}
            height={25}
            width={25}
            style={{
          transform: 'translate(-40px, -80px)',
          }}
          />
      )
    } else {
      return (
        <Doughnut
            data={{
              labels: [""],
              datasets: [
                {
                  data: [data.vote_average * 10, 100 - data.vote_average * 10],
                  backgroundColor: ["rgba(33, 208, 122, 0.6)", "rgba(0,0,0,0)"],
                  borderColor: ["rgba(0, 0, 0, 0)", "rgba(0,0,0,0)"],
                },
              ],
            }}
            options = {{
              events:[],
              plugins: {
                legend: {
                  display: false
                }
              },
              maintainAspectRatio: false
            }}
            height={25}
            width={25}
            style={{transform: `translate(-40px, -80px)`}}
          />
      )
    }
  }

  return (
    <div
      style={{
        display: "inline-block",
        overflow: "hidden",
        margin: "auto 2px auto 2px"
      }}
    >
      <img
        onClick={handleShow}
        src={src}
        style={{ maxHeight: 370, maxWidth: 174, height: 261, borderRadius: 8 }}
        alt=""
      />
      <div style={{height:0}}>
        {whichDonut()}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
            style={{ maxHeight: 370, maxWidth: 174 }}
            alt=""
          />{" "}
          <br />
          <br />
          Vote average: <br /> {data.vote_average} <br />
          <br />
          Vote count: <br /> {data.vote_count} <br />
          <br />
          Release date: <br /> {data.release_date} <br />
          <br />
          Overview: <br /> {data.overview} <br />
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Poster;
