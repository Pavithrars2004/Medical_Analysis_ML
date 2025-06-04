import Navbar from '../../../app/_Components/Navbar'
import React from 'react'
import HeroSection from '../../../app/_Components/HeroSection'
import Footer from '../../../app/_Components/Footer'
import FeaturesSection from '../../../app/_Components/FeatureSection'

const page = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <FeaturesSection /> 
      <Footer />
    </div>
  )
}

export default page
