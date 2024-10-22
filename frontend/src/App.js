import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LandingPage from './components/pages/LandingPage'
import Signup from './components/Signup'
import Login from './components/Login'
import ForgetPassword from './components/ForgetPassword'
import  ResetPassword  from './components/ResetPassword'
import HackedTerminal from './components/HackedTerminal'
import HomeReal from './components/pages/HomeReal'
import Home from './components/pages/Home'
import Dashboard from './components/Dashboard'
 function App() {
  return (
   <BrowserRouter>
    <Routes>
    <Route  path="/signup" element={<Signup/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/home" element={<LandingPage/>}></Route>
    <Route path="/homeTest" element={<HomeReal/>}></Route>
    <Route path="/homeTesting" element={<Home/>}></Route>
    <Route path="/HackedTerminal" element={<HackedTerminal/>}></Route>
    <Route path="/dashboard" element={<Dashboard/>}></Route>
    
    <Route path="/forgetpassword" element={<ForgetPassword/>}></Route>
    <Route path="/auth/resetPassword/:token" element={<ResetPassword />} />
    </Routes>
   
   </BrowserRouter>
  )
}
export default App