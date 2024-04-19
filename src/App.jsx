import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';



import AdminPage from './Pages/AdminPage/AdminPage';
import AdminAddCandidate from "./components/adminAddCandidate/AdminAddCandidate";
import HomePage from './Pages/HomePage/HomePage';
import AdminLogin from "./components/AdminLogin/AdminLogin";
import CreateDistrict from './components/CreateDistrict/CreateDistrict';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
       
        
        <Routes>

          <Route path='/adminAddCandidate' element={<div><AdminAddCandidate /></div>} />
          <Route path='/AdminPage' element={<div><AdminPage /></div>} />
          <Route path='/AdminLogin' element={<div><AdminLogin /></div>} />
          <Route path='/CreateDistrict' element={<div><CreateDistrict /></div>} />
          <Route exact path='/' element={<div className="background-container"><HomePage /></div>} />
          

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
