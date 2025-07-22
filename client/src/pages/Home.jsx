import React from 'react'
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import Features from '../components/Features'
import Categories from '../components/Categories'
import FeaturedProduct from '../components/FeaturedProduct'
import RecentProduct from '../components/RecentProduct'
import Footer from '../components/Footer'
import useFetch from '../hooks/useFetch'

function Home() {
  const {data: categories} = useFetch('http://localhost:3000/categories');
  return (
    <>
      <Header categories={categories}/>
      <Carousel/>
      <Features/>
      <Categories categories={categories}/>
      <FeaturedProduct/>
      <RecentProduct/>
      <Footer/>
    </>
  )
}

export default Home