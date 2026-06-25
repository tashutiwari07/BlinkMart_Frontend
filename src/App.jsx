// import React from 'react'
// import { Routes, Route, useLocation } from 'react-router-dom'  
// import Header from './Components/Header'
// import Home from './Pages/Home'
// import ProductDetails from './Pages/ProductDetails'
// import LoginPage from './Pages/LoginPage'
// import { useState } from 'react'
// import ProductCards from './Components/ProductCards'
// import Footer from './Components/Footer'
// import ProductRoutes from './Components/ProductRoutes'
// import { FaLocationDot } from "react-icons/fa6"

// export default function App() {

//   const [loggedIn, setLoggedIn] = React.useState(false);
//   const location = useLocation();
  
//   return (
//     <div>
//       <FaLocationDot />

//       <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
//       <Routes>
//         <Route path="/" element={<Home/>}/>

//         {/* <Route path="/product/:id"
//          element={<ProductRoutes isLoggedIn={loggedIn}></ProductRoutes/> </ProductRoutes>}/> */}

//           <Route path="/product/:id" element={<ProductDetails />}/>
//           <Route path='login' element={<LoginPage setLoggedIn={setLoggedIn}/>}/>

//         <Route path="*" element={<Home/>}/>
//       </Routes>
//       {location.pathname === '/' && <Footer/>}
//     </div>
//   )
// }

import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Pages/Home'
import ProductDetails from './Pages/ProductDetails'
import Loginpage from './Pages/Loginpage'
import SignupPage from './Pages/SignupPage'
import ProtectRoutes from './Components/ProtectRoutes'
import MyCart from './Pages/MyCart'
import CheckoutPage from './Pages/CheckoutPage'
import PaymentPage from './Pages/PaymentPage'
import OrderSuccess from './Pages/OrderSuccess'
import ProfilePage from './Pages/ProfilePage'
import MyOrdersPage from './Pages/MyOrdersPage'
import { ToastContainer } from 'react-toastify'
import Footer from "./Components/Footer";
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedUser = localStorage.getItem('blinkit_user');
    return Boolean(savedUser);
  });
  const location = useLocation();
  return (
    <>
    <ToastContainer position="top-right" autoClose={2000} />
     <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Loginpage setIsLoggedIn={setIsLoggedIn}/>}/>
      <Route path="/signup" element={<SignupPage />}/>
      <Route
        path="/products/:id"
        element={
          <ProtectRoutes isLoggedIn={isLoggedIn}>
            <ProductDetails/>
          </ProtectRoutes>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectRoutes isLoggedIn={isLoggedIn}>
            <MyCart/>
          </ProtectRoutes>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectRoutes isLoggedIn={isLoggedIn}>
            <CheckoutPage/>
          </ProtectRoutes>
        }
      />
      <Route
        path="/payment"
        element={
          <ProtectRoutes isLoggedIn={isLoggedIn}>
            <PaymentPage/>
          </ProtectRoutes>
        }
      />
      <Route path="/order-success" element={<OrderSuccess/>}/>
      <Route
        path="/profile"
        element={
          <ProtectRoutes isLoggedIn={isLoggedIn}>
            <ProfilePage setIsLoggedIn={setIsLoggedIn}/>
          </ProtectRoutes>
        }
      />
      <Route
        path="/my-orders"
        element={
          <ProtectRoutes isLoggedIn={isLoggedIn}>
            <MyOrdersPage />
          </ProtectRoutes>
        }
      />
     </Routes>
      {location.pathname === '/' && <Footer/>}
    </>   
  )
}
