import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import AdminPage from './Pages/AdminPage/AdminPage';
import AdminAddCandidate from "./components/adminAddCandidate/AdminAddCandidate";
import HomePage from './Pages/HomePage/HomePage';
import AdminLogin from "./components/AdminLogin/AdminLogin";
import CreateDistrict from './components/CreateDistrict/CreateDistrict';
import LoginForm from './components/LoginUser/LoginUser';
import DistrictsPage from './Pages/DistrictList/DistrictList';
import CandidatesList from './Pages/CandidatesList/CandidatesList';
import VoterList from './Pages/VoterList/VoterList';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/adminAddCandidate' element={<AdminAddCandidate />} />
          <Route path='/AdminPage' element={<AdminPage />} />
          <Route path='/AdminLogin' element={<AdminLogin />} />
          <Route path='/CreateDistrict' element={<CreateDistrict />} />
          <Route path='/LoginUser' element={<LoginForm />} />
          <Route path='/DistrictList' element={<DistrictsPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/CandidatesList' element={<CandidatesList />} />
          <Route path='/VoterList' element={<VoterList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
