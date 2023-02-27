import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';
// import MoviePage from './components/pages/MoviePage';
// import TVPage from './components/pages/TVPage';
// import SearchPage from './components/pages/SearchPage';
// import PeoplePage from './components/pages/PeoplePage';
// import PersonPage from './components/pages/PersonPage';

function App() {
  return (
    <>
      <Navbar />
      {/* <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/movie' element={<Home />} />
          <Route path='/movie/:id' element={<MoviePage />} />
          <Route path='/tv' element={<TVPage />} />
          <Route path='/tv/:id' element={<MoviePage movie={false} />} />
          <Route path='/person' element={<PeoplePage />} />
          <Route path='/person/:id' element={<PersonPage />} />
          <Route path='/search' element={<SearchPage />} />
        </Routes>
      </BrowserRouter> */}
    </>
  );
}

export default App;
