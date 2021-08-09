import React, { Component } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

let apiKey = "7aa9ec6612579e4bfd39288619de239c";

const Popular = (props) => {
    const url = 'https://image.tmdb.org/t/p/original/'
    console.log(props.props.poster_path)
    return (
        <div style={{ display: "inline-block", overflow:'hidden' }}>
            <img width="150px" alt="" src={`${url}${props.props.poster_path}`}></img>
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
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
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
      return this.state.movies.map((e)=>{
          return <Popular props={e} />
      })
  }
  render() {
    return (
      <Container className='text-center'>
        <h3 className="text-center">Popular Movies</h3>
        <div>{this.popularList()}</div>
      </Container>
    );
  }
}

export default LandingPage;
