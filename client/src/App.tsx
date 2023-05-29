import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/navbar/Navbar';
import {
  Home,
  LoginPage,
  MoviePage,
  PeoplePage,
  PersonPage,
  ProfilePage,
  RegisterPage,
  SearchPage,
  TestPage,
} from './components/pages';

function App(): JSX.Element {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/movies" element={<Home />} />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/tv" element={<Home movie={false} />} />
          {/* <Route path="/tv" element={<TestPage />} /> */}
          <Route path="/tv/:id" element={<MoviePage movie={false} />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:id" element={<PersonPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
