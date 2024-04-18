import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';



import AdminPage from './Pages/AdminPage/AdminPage';
import AdminAddCandidate from "./components/adminAddCandidate/AdminAddCandidate";
import HomePage from './Pages/HomePage/HomePage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
       
        
        <Routes>
        <Route exact path='/' element={<div className="background-container"><HomePage /></div>} />
          <Route path='/adminAddCandidate' element={<div><AdminAddCandidate /></div>} />
          <Route path='/AdminPage' element={<div><AdminPage /></div>} />
          

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
