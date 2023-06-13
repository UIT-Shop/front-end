import React from 'react'
import Intro from '../components/home/Intro'
import './Home.module.css'
import RecommendProduct from '../components/home/RecommendProduct'
import HomeProduct from '../components/home/HomeProduct'
const Home = () => {
  return (
    <>
      <Intro />
      {/* <HomeProduct /> */}
      <RecommendProduct />
    </>
  )
}

export default Home