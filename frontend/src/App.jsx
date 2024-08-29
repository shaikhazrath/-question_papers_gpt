import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './screens/admin';
import Home from './screens/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin' element={<Admin />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
