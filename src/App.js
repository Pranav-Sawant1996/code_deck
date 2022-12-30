
import React, { Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Page404 from './pages/Page404';
import Playground from './pages/Playground';


function App() {
  return (
 <div>
  <Routes>
    <Route path='/' element={<Home/>} ></Route>
    <Route path='/Playground/:folderID/:playgroyndID' element={<Playground/>}></Route>
    <Route path='*' element={<Page404/>}></Route>
  </Routes>
 </div>
  );
}

export default App;
