// import react
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import useKeypress from "react-use-keypress";

const Poster = (props) => {
  useKeypress('Enter', ()=>{
    handleClose()
  })
  let [show, setShow] = useState(false);
  let [src, setSrc] = useState("");
  let [data,setData] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const setImage = () => {
      if (props.props == null) {
        return;
      } else {
        setSrc(`https://image.tmdb.org/t/p/original${props.props.poster_path}`);
        setData(props.props)
      }
    };
    setImage();
  });

  return (
    <div
      style={{
        display: "inline-block",
        overflow: "hidden",
        border: "1px solid black",
      }}
    >
      <img onClick={handleShow} src={src} style={{ maxHeight: 370, maxWidth: 174, height: 261 }} alt="" />
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>{data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <img src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} style={{ maxHeight: 370, maxWidth: 174 }} /> <br /><br />
          Vote average: <br/> {data.vote_average} <br /><br />
          Vote count: <br/> {data.vote_count} <br /><br />
          Release date: <br/> {data.release_date} <br/><br />
          Overview: <br/> {data.overview} <br /><br />
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
