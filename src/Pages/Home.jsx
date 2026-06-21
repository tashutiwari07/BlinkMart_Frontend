import React from 'react'
import Hero from '../Components/Hero'
import TopProducts from '../Components/TopProducts'
import ProductCards from '../Components/ProductCards'
import Footer from '../Components/Footer'

export default function Home() {
  return (
    <div>
      <Hero />
      <TopProducts />
      <ProductCards />
      <Footer />
    </div>
  )
}
