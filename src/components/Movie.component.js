//import dependencies
import React, { useState, useEffect } from "react";
import { useCaretPosition } from "react-use-caret-position";
import axios from "axios";
import { backendURL } from "./sharedVariables";

const Movie2 = (props) => {
  const [name, setName] = useState("");
  const [id, setId] = useState(props.movies.id);
  const { ref: inputRef, updateCaret } = useCaretPosition();

  // initial load
  useEffect(() => {
    console.log("props", props);
    if (props.movies == null) {
      return;
    } else {
      setName(props.movies.name);
      setId(props.movies.id);
    }
  }, []);

  // edit state but dont get movies with axios
  const editName = (newname) => {
    setName(newname);
  };

  const editMovie = (id, name)=> {
    axios
      .put(backendURL, {
        id,
        name,
      })
      .then((res) => {
        // console.log(res.data);
        props.getMovies();
      });
  }

  const deleteMovie = (id) => {
    axios
      .delete(backendURL, {
        data: {
          id,
        },
      })
      .then((res) => {
        props.getMovies();
      });
  }

  const handleChange = (e) => {
    editName(e.target.value);
    updateCaret();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("enter pressed");
      editMovie(id, name);
    }
  };

  return (
    <div className="mx-auto text-center" style={{ width: "100%" }}>
      <input
        ref={inputRef}
        className="text-center movielistinput"
        onChange={handleChange}
        value={name}
        onKeyDown={handleKeyDown}
      ></input>
      <button
        onClick={() => {
          deleteMovie(id);
        }}
      >
        x
      </button>
    </div>
  );
};

export default Movie2;
