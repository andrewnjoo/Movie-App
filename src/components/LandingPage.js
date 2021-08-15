import React, { Component } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { tmdbKey } from "./sharedVariables";
import Poster from "./Poster.component";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      counter: 1,
    };
    this.getPopular = this.getPopular.bind(this);
    this.increaseCounter = this.increaseCounter.bind(this);
  }

  componentDidMount() {
    this.getPopular();
  }

  getPopular() {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.movies = []
    this.setState(stateCopy)
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbKey}&language=en-US&page=${this.state.counter}`
      )
      .then((res) => {
        // console.log(this.state)
        // const stateCopy = this.state;
        const newState = {
          movies: res.data.results,
        };
        this.setState(newState);
        console.log('state is', this.state);
      });
  }
  popularList() {
    return this.state.movies.map((e, i) => {
      return <Poster props={e} key={i} />;
    });
  }
  increaseCounter(num) {
    if (this.state.counter === 1 && num === -1) {
      console.log('not allow')
      return;
    }
    let stateCopy = Object.assign({}, this.state);
    stateCopy.counter += num;
    this.setState(stateCopy);
    setTimeout(()=>{
      console.log('counter/state', this.state)
      this.getPopular()
    },100)

  }
  render() {
    return (
      <Container className="my-5 w-75 text-center">
        <h3 className="text-center">Popular Movies</h3>
        <div>page {this.state.counter}
        </div>
        <button className='btn btn-info border border-dark' onClick={() => {this.increaseCounter(-1)}}>&lt;</button> &nbsp;
        <button className='btn btn-info border border-dark' onClick={() => {this.increaseCounter(1)}}>&gt;</button>
        <br></br>
        <br></br>
        <br></br> 
        <div className='text-center'>{this.popularList()}</div>
        <br></br>
        <br></br>
        <button className='btn btn-info border border-dark' onClick={() => {this.increaseCounter(-1)}}>&lt;</button> &nbsp;
        <button className='btn btn-info border border-dark' onClick={() => {this.increaseCounter(1)}}>&gt;</button>
      </Container>
    );
  }
}

export default LandingPage;
