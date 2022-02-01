// import
import React, { Fragment, useState, useEffect, Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import NavBar from "./components/NavBar";
import MovieList from "./components/MovieList";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Loading from "./components/Loading";
import LandingPage from "./components/LandingPage";
import { backendURL } from "./components/sharedVariables";
import Footer from "./components/Footer";
import Television from "./components/Television";
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

  async function isAuth() {
    // check current time; if it's 1 hour later (JWT expires), delete login_time token
    let current_time = Date.now();
    console.log(
      (current_time - localStorage.getItem(["login_time"])) / 1000 + " seconds"
    );
    if ((current_time - localStorage.getItem(["login_time"])) / 1000 > 3600) {
      localStorage.removeItem("login_time");
    }
    if (localStorage.login_time) {
      setisAuthenticated(true);
    } else {
      setisAuthenticated(false);
    }
    //pass jwt token to middleware in backend to check if authorized
    // try {
    //   const response = await fetch(`${backendURL}auth/is-verify`, {
    //     method: "GET",
    //     headers: { token: localStorage.token },
    //   });
    //   const parseRes = await response.json();
    //   // console.log('parseres', parseRes)
    //   parseRes === true ? setisAuthenticated(true) : setisAuthenticated(false);
    // } catch (err) {
    //   console.error(err.message);
    // }
  }

  // check if authenticated
  useEffect(() => {
    isAuth();
  }, []);

  return (
    <>
      <NavBar isAuth={isAuthenticated} setAuth={setAuth} />
      <main style={{ marginTop: "70px" }}>
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
                !isAuthenticated ? (
                  <Redirect to="/" />
                ) : (
                  <MovieList {...props} />
                )
              }
            />
            <Route
              exact
              path="/profile"
              render={(props) =>
                !isAuthenticated ? <Suspense /> : <Profile {...props} />
              }
            />
            <Route
              exact
              path="/movies"
              render={(props) =>
                !isAuthenticated ? (
                  // <Loading {...props} />
                  <LandingPage {...props} />
                ) : (
                  <LandingPage {...props} />
                )
              }
            />
            <Route
              exact
              path="/television"
              render={(props) =>
                !isAuthenticated ? (
                  // <Loading {...props} />
                  <Television {...props} />
                ) : (
                  <Television {...props} />
                )
              }
            />
          </Switch>
        </BrowserRouter>
      </main>
      <Footer />
    </>
  );
}

export default App;
