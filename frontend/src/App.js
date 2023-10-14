import logo from './logo.svg';
import './App.css';
import Contacts from './Contacts';
import ContactIndividual from './ContactIndividual';
import Events from './Events';
import EventIndividual from './EventIndividual';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contact-individual" element={<ContactIndividual />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event-individual" element={<EventIndividual />} />
      </Routes>
    </Router>
  );
}

export default App;