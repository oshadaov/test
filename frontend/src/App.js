import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './components/pages/SignUp';
import SignInForm from './components/pages/SignIn';
import Home from './components/pages/Home';
import NavBar from './components/NavBar';
import Dailyexpenses from './components/pages/DailyExpenses/dailyexpenses';
import HomePage from './components/pages/Homepage/HomePage';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/DailyExpenses" element={<Dailyexpenses/>}/>
      </Routes>
    </Router>
  );
}

export default App;
