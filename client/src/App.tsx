import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Home,
  MoviePage,
  PeoplePage,
  PersonPage,
  SearchPage,
  RegisterPage,
  LoginPage,
  ProfilePage,
} from './components/pages';
import Navbar from './components/layout/navbar/Navbar';

function App(): JSX.Element {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/movies' element={<Home />} />
          <Route path='/movies/:id' element={<MoviePage />} />
          <Route path='/tv' element={<Home movie={false} />} />
          <Route path='/tv/:id' element={<MoviePage movie={false} />} />
          <Route path='/people' element={<PeoplePage />} />
          <Route path='/people/:id' element={<PersonPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
