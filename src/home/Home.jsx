import React from 'react'
import Navbar from '../common/header/NavBar'
import Intro from './Intro'
import './Home.css'
import RecommendProduct from './RecommendProduct'
import HomeProduct from './HomeProduct'
const Home = () => {
  return (
    <>
      <Navbar />
      <Intro />
      {/* <HomeProduct /> */}
      <RecommendProduct />
    </>
  )
}

export default Home