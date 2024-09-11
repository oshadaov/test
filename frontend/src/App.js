import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LandingPage from './components/pages/LandingPage'
import Signup from './components/Signup'
import Login from './components/Login'
import ForgetPassword from './components/ForgetPassword'
import  ResetPassword  from './components/ResetPassword'
 function App() {
  return (
   <BrowserRouter>
    <Routes>
    <Route path="/signup" element={<Signup/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/home" element={<LandingPage/>}></Route>
    <Route path="/forgetpassword" element={<ForgetPassword/>}></Route>
    <Route path="/resetpassword/:token" element={<ResetPassword/>}></Route>
    </Routes>
   
   </BrowserRouter>
  )
}
export default App