import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';



import AdminLogin from './components/AdminLogin/AdminLogin';
import AdminAddCandidate from "./components/adminAddCandidate/AdminAddCandidate";
import HomePage from './components/HomePage/HomePage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
       
        
        <Routes>
        <Route exact path='/' element={<div className="background-container"><HomePage /></div>} />
          <Route path='/adminAddCandidate' element={<div><AdminAddCandidate /></div>} />
          <Route path='/AdminLogin' element={<div><AdminLogin /></div>} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
