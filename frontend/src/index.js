import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './Login';
import RequireAuth from './auth/RequireAuth';
import Contacts from './Contacts';
import ContactIndividual from './ContactIndividual';
import Events from './Events';
import EventIndividual from './EventIndividual';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import { Outlet } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/login" element={<Login/>}/>
          <Route path="/contacts" element={<div><RequireAuth><Outlet /></RequireAuth></div>}>
            <Route index element={<Contacts />} />
            <Route path=":contactId" element={<ContactIndividual />} />
          </Route>
          <Route path="/events" element={<div><RequireAuth><Outlet /></RequireAuth></div>}>
              <Route index element={<Events />} />
              <Route path=":eventId" element={<EventIndividual />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
