import React from 'react'
import Navbar from '../common/header/NavBar'
import Intro from './Intro'
import './Home.css'
import RecommendProduct from './RecommendProduct'
const Home = () => {
  return (
    <>
    <Navbar />
    <Intro/>
    <RecommendProduct/>
    </>
  )
}

export default Home