import React, { Component } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

import { tmdbKey } from "./sharedVariables";

const Popular = (props) => {
    const url = 'https://image.tmdb.org/t/p/original/'
    // console.log(props.props.poster_path)
    return (
        <div style={{ display: "inline-block", overflow:'hidden', border:'1px solid black' }}>
            <img style={{maxWidth: "200px", maxHeight:'262px'}} alt="" src={`${url}${props.props.poster_path}`}></img>
        </div>
    )
}


class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    this.getPopular();
  }

  getPopular() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbKey}&language=en-US&page=1`
      )
      .then((res) => {
          const newState = {
              movies: res.data.results
          }
          this.setState(newState);
          console.log(this.state);
      });
  }
  popularList(){
      return this.state.movies.map((e,i)=>{
          return <Popular props={e} key={i} />
      })
  }
  render() {
    return (
      <Container className='text-center my-5 w-75'>
        <h3 className="text-center">Popular Movies</h3>
        <div>{this.popularList()}</div>
        <br></br>
        <br></br>
      </Container>
    );
  }
}

export default LandingPage;
