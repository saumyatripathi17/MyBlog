import React from 'react'
import Navbar from '../componets/Navbar'
import Header from '../componets/Header'
import BlogList from '../componets/BlogList'
import Newsletter from '../componets/Newsletter'
import Footer from '../componets/Footer'

const Home = () => {
  return (
    <>
    <Navbar />
    <Header />
    <BlogList />
    <Newsletter />
    <Footer />
    </>
  )
}

export default Home