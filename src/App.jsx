import React from 'react'
import { Routes, Route } from 'react-router-dom'  
import Header from './Components/Header'
import Home from './Pages/Home'
import ProductDetails from './Pages/ProductDetails'

export default function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="*" element={<Home/>}/>
      </Routes>
    </div>
  )
}
