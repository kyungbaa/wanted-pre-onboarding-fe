import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './Signin';
import Signup from './Signup';
import Board from './Board';

const Router = props => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
