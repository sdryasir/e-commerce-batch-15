import React from 'react'
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import Features from '../components/Features'
import Categories from '../components/Categories'
import FeaturedProduct from '../components/FeaturedProduct'
import RecentProduct from '../components/RecentProduct'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <Header/>
      <Carousel/>
      <Features/>
      <Categories/>
      <FeaturedProduct/>
      <RecentProduct/>
      <Footer/>
    </>
  )
}

export default Home