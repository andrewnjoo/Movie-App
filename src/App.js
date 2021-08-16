import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import MyNavBar from "./components/MyNavBar";
import MovieList from "./components/MovieList";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Profile2  from "./components/Profile2";
import LandingPage from "./components/LandingPage";
import { backendURL } from "./components/sharedVariables";

// import { Helmet } from 'react-helmet'
toast.configure({
  position: 'bottom-right',
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
    <Fragment>
      <MyNavBar isAuth={isAuthenticated} setAuth={setAuth} />
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
              !isAuthenticated ? <Profile2 {...props} />: <Profile {...props} />
            }
          />
           <Route
            exact
            path="/popular"
            render={(props) =>
              !isAuthenticated ? <Profile2 {...props} />: <LandingPage {...props} />
            }
          />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
