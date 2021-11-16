// import modules
import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
// import components
import NavBar from "./components/NavBar";
import MovieList from "./components/MovieList";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Profile2 from "./components/Profile2";
import Loading from "./components/Loading";
import LandingPage from "./components/LandingPage";
import { backendURL } from "./components/sharedVariables";
import Footer from "./components/Footer";
import TopRated from './components/TopRated'

// import { Helmet } from 'react-helmet'
//configure toastify
toast.configure({
  position: "bottom-right",
  autoClose: 3000,
  draggable: true,
  pauseOnHover: false,
});

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setisAuthenticated(boolean);
  };

  //pass jwt token to middleware in backend to check if authorized
  async function isAuth() {
    try {
      const response = await fetch(`${backendURL}auth/is-verify`, {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      // console.log('parseres', parseRes)

      parseRes === true ? setisAuthenticated(true) : setisAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  // check if authenticated
  useEffect(() => {
    isAuth();
  }, []);

  return (
    <>
      <NavBar isAuth={isAuthenticated} setAuth={setAuth} />
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) =>
              !isAuthenticated ? (
                <LandingPage {...props} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/register"
            render={(props) =>
              !isAuthenticated ? (
                <Register {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/login"
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/dashboard"
            render={(props) =>
              !isAuthenticated ? <Redirect to="/" /> : <MovieList {...props} />
            }
          />
          <Route
            exact
            path="/profile"
            render={(props) =>
              !isAuthenticated ? (
                <Profile2 {...props} />
              ) : (
                <Profile {...props} />
              )
            }
          />
          <Route
            exact
            path="/popular"
            render={(props) =>
              !isAuthenticated ? (
                <Loading {...props} />
              ) : (
                <LandingPage {...props} />
              )
            }
          />
          <Route
            exact
            path="/toprated"
            render={(props) =>
              !isAuthenticated ? (
                <Loading {...props} />
              ) : (
                <TopRated {...props} />
              )
            }
          />
        </Switch>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
