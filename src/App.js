import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar  from './components/Navbar';
import Overview from './pages/Overview';
import Pipeline from './pages/Pipeline';
import Generate from './pages/Generate';
import Explain  from './pages/Explain';
import Diagnose from './pages/Diagnose';
import Export   from './pages/Export';
import API      from './pages/API';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"         element={<Overview />} />
        <Route path="/pipeline" element={<Pipeline />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/explain"  element={<Explain />}  />
        <Route path="/diagnose" element={<Diagnose />} />
        <Route path="/export"   element={<Export />}   />
        <Route path="/api"      element={<API />}      />
      </Routes>
    </BrowserRouter>
  );
}
