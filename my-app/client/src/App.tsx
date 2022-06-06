import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          {/* <Route path="/about" element={About} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
