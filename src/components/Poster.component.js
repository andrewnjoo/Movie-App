import React, { useState, useEffect } from "react";
const url = "https://image.tmdb.org/t/p/original/";
const Poster = (props) => {
  let [src, setSrc] = useState("");
  useEffect(() => {
    function myfunction() {
      if (props.props == null) {
        return;
      } else {
        setSrc(`https://image.tmdb.org/t/p/original${props.props.poster_path}`);
      }
    }
    myfunction();
  });
  return (
    <div style={{ display: "inline-block", overflow:'hidden', border:'1px solid black' }}>
      <img src={src} style={{maxHeight:370, maxWidth: 174}} alt="" />
    </div>
  );
};

export default Poster;
