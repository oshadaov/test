import React from 'react'
import NavBar from '../NavBar'
import HeroSection from '../HeroSection'
import Footer from '../Footer'

 function LandingPage() {
  return (
    <>
    <div className='LandingPageContainer'>
        <NavBar/>
        <HeroSection/>
        <Footer/>
    </div>
    </>
  )
}
export default LandingPage