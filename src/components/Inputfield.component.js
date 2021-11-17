import React, { useState } from "react";
const magnifying = require( '../assets/magnifying-glass.svg')


const Inputfield = (props) => {
  const [textInput, setTextInput] = useState("");

  const handleChange = (e) => {
    setTextInput(e.target.value);
  };
  
  const handleKeyDown = (e) => {
    setTextInput(e.target.value);
    if (e.key === "Enter") {
      // console.log("enter pressed");
      props.addMovie(textInput);
      setTextInput("");
      props.getMovies()
    }
  };
  return (
    <div className='pt-2' style={{ textAlign: "center", position: 'relative' }}>
      <img className='magnifying' alt=''src={magnifying.default} />
      <input
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={textInput}
        placeholder="add movie"
        style={{minWidth:'250px'}}
      />
    </div>
  );
};

export default Inputfield;
