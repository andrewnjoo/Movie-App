import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import useKeypress from 'react-use-keypress';

function Poster({ props }) {
  const [show, setShow] = useState(false);
  const [src, setSrc] = useState('');
  const [data, setData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useKeypress('Enter', () => {
    handleClose();
  });

  useEffect(() => {
    // console.log(props);
    const setImage = () => {
      if (props == null) {
        console.log('no props');
      } else {
        setSrc(`https://image.tmdb.org/t/p/original${props.poster_path}`);
        setData(props);
      }
    };
    setImage();
  });

  const movieRating = () => {
    if (data.vote_average === 0) {
      return (
        <div className="movierating" style={{ color: 'black' }}>
          N/A
        </div>
      );
    }
    if (data.vote_average < 7) {
      return (
        <div className="movierating" style={{ color: '#cacd2f' }}>
          {`${data.vote_average * 10}%`}
        </div>
      );
    }
    return (
      <div className="movierating" style={{ color: '#21d07a' }}>
        {`${data.vote_average * 10}%`}
      </div>
    );
  };

  return (
    <div className="poster-display-inline">
      <img
        role="presentation"
        onClick={handleShow}
        onKeyDown={handleShow}
        src={src}
        style={{
          maxHeight: 370, maxWidth: 174, height: 261, borderRadius: 8,
        }}
        alt=""
      />

      {movieRating()}

      {/* Modal */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{data.title || data.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
            style={{ maxHeight: 370, maxWidth: 174 }}
            alt=""
          />
          {' '}
          <br />
          <br />
          Vote average:
          {' '}
          <br />
          {' '}
          {data.vote_average}
          {' '}
          <br />
          <br />
          Vote count:
          {' '}
          <br />
          {' '}
          {data.vote_count}
          {' '}
          <br />
          <br />
          Release date:
          {' '}
          <br />
          {' '}
          {data.release_date || data.first_air_date}
          {' '}
          <br />
          <br />
          Overview:
          {' '}
          <br />
          {' '}
          {data.overview}
          {' '}
          <br />
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
}

export default Poster;
