import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LandingPage from './components/pages/LandingPage'
import Signup from './components/Signup'
 function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}></Route>
    </Routes>
   
   </BrowserRouter>
  )
}
export default App