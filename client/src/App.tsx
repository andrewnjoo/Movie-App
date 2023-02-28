import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';
import MoviePage from './components/pages/MoviePage';
import PeoplePage from './components/pages/PeoplePage';
import PersonPage from './components/pages/PersonPage';
import SearchPage from './components/pages/SearchPage';

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
