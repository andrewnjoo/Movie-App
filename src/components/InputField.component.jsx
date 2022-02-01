import React, { useState } from 'react';
// import { Button, Form, FormControl } from "react-bootstrap";
const magnifying = require('../assets/magnifying-glass.svg');

function InputField({ addMovie, getMovies }) {
  const [textInput, setTextInput] = useState('');

  const handleChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    setTextInput(e.target.value);
    if (e.key === 'Enter') {
      // console.log("enter pressed");
      addMovie(textInput);
      setTextInput('');
      getMovies();
    }
  };
  return (
    <div className="pt-2" style={{ textAlign: 'center', position: 'relative' }}>
      <img className="magnifying" alt="" src={magnifying.default} />
      {/* React Form */}
      {/* <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form> */}
      <input
        className="addmovieinput"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={textInput}
        placeholder="add movie"
      />
    </div>
  );
}

export default InputField;
