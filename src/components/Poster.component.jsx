import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import useKeypress from 'react-use-keypress';
import axios from 'axios';
import { tmdbKey } from './sharedVariables';
import TrailerModal from './TrailerModal.component';

function Poster({ props, type }) {
  const [show, setShow] = useState(false);
  const [src, setSrc] = useState('');
  const [data, setData] = useState([]);
  const [displayTrailer, setDisplayTrailer] = useState(false);
  const [youtube, setYoutube] = useState('');

  const handleShow = () => {
    setShow(!show);
    setDisplayTrailer(false);
  };

  useKeypress('Enter', () => {
    // handleShow();
  });

  useEffect(() => {
    // console.log(youtube);
  }, [youtube]);

  useEffect(() => {
    // console.log(props);
    if (props !== null) {
      setSrc(`https://image.tmdb.org/t/p/original${props.poster_path}`);
      setData(props);
    }
  }, [props]);

  useEffect(async () => {
    if (props !== null) {
      // console.log(props);
      // try movie
      let temp;
      if (type === 'tv') {
        temp = await axios.get(`https://api.themoviedb.org/3/tv/${props.id}/videos?api_key=${tmdbKey}&language=en-US`);
      } else {
        temp = await axios.get(`https://api.themoviedb.org/3/movie/${props.id}/videos?api_key=${tmdbKey}&language=en-US`);
      }
      temp = temp.data.results;
      temp = temp.filter((video) => video.type === 'Trailer');
      // console.log(temp);
      temp = temp[0]?.key || '';
      setYoutube(temp);
    }
  }, [props]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

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

      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>{data.title || data.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
            style={{ maxHeight: 370, maxWidth: 174 }}
            alt=""
          />
          <Button className="mx-3" variant="primary" onClick={() => setDisplayTrailer(true)}>▶ Play Trailer</Button>
          <TrailerModal
            displayTrailer={displayTrailer}
            youtubeLink={youtube}
            setDisplayTrailer={setDisplayTrailer}
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
          <Button variant="secondary" onClick={handleShow}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Poster;
