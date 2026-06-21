import React from 'react'
import Header from './Components/Header'
import Hero from './Components/Hero'
import ProductCards from './Components/ProductCards'
import Home from './Pages/Home'
import TopProducts from './Components/TopProducts'

export default function App() {
  return (
    <div>
      <Header/>
      <Hero/>
      <Home />
      <TopProducts />
      <ProductCards />
    </div>
  )
}
