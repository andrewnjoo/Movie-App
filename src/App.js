import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Mynavbar from "./components/mynavbar.component";
import Movielist from "./components/movielist.component";
import Register from "./components/Register";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage"

// import { Helmet } from 'react-helmet'
toast.configure({
  autoClose: 3000,
  draggable: true,
  pauseOnHover: false
})


function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setisAuthenticated(boolean);
  };

  //pass jwt token to middleware in backend to check if authorized
  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      // console.log(parseRes)

      parseRes === true ? setisAuthenticated(true) : setisAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  // check if authenticated
  useEffect(() => {
    isAuth();
    console.log("isauth", isAuthenticated);
  });

  return (
    <Fragment>
      <Mynavbar setAuth={setAuth} />
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) =>
              !isAuthenticated ? (
                <LandingPage />
              ) : (
                <Redirect to="/" />
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
        </Switch>
        {/* <Route path='/' exact component={Movielist} /> we need this later*/}
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
