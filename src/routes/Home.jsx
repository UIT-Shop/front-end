import React from 'react'
import Intro from '../components/home/Intro'
import './Home.module.css'
import RecommendProduct from '../components/home/RecommendProduct'
import HomeProduct from '../components/home/HomeProduct'
import Topsale from '../components/home/TopSale'
const Home = () => {
  return (
    <>
      <Intro />
      {/* <HomeProduct /> */}
      <RecommendProduct />
      <Topsale />
    </>
  )
}

export default Home