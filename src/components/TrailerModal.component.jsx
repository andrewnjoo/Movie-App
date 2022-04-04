/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';

function TrailerModal({ displayTrailer, youtubeLink, setDisplayTrailer }) {
  return displayTrailer ? (
    <section className="modal__bg">
      <div className="modal__content" modal={displayTrailer}>
        <IoCloseOutline
          className="modal__close"
          arial-label="Close modal"
          onClick={() => setDisplayTrailer(!displayTrailer)}
        />
        <div className="modal__video-align">
          <iframe
            className="trailer-modal"
            loading="lazy"
            width="800"
            height="500"
            src={`https://www.youtube.com/embed/${youtubeLink}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  ) : '';
//     <div className="trailer-modal">
//       <iframe title="trailer" width="50%" height="50%" src={`https://www.youtube.com/embed/${youtubeLink}`} />
//     </div>
//   ) : '';
}

export default TrailerModal;
