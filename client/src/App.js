// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';  // Import the Navbar component
import Dashboard from './pages/Dashboard';
import AddContact from './pages/AddContact';
import UpdateContact from './pages/UpdateContact'; // Import the UpdateContact page

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/edit-contact/:email" element={<UpdateContact />} />  {/* Edit existing contact */}
      </Routes>
    </Router>
  );
};

export default App;

//last updated