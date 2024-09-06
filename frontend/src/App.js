// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './components/pages/SignUp';
import SignInForm from './components/pages/SignIn';
import Home from './components/pages/Home';
import NavBar from './components/NavBar';

import HomePage from './components/pages/Homepage/HomePage';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />
       
      </Routes>
    </Router>
  );
}

export default App;
