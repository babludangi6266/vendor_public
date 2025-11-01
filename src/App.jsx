import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './components/i18n.js';
import HomePage from './components/HomePage/HomePage';
import CandidateRegistration from './components/CandidateRegistration/CandidateRegistration';
import CompanyRegistration from './components/CompanyRegistration/CompanyRegistration';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/candidate-registration" element={<CandidateRegistration />} />
          <Route path="/company-registration" element={<CompanyRegistration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;