import React from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'

// import pages
import Home from './Components/Home'
import UserPage from './Components/InfoUser/UserPage';
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup';
import LoginSignupPage from './Components/LoginSignupPages/LoginSignupPage';
import DetailPage from './Components/Detail/DetailPage';
import MenuPage from './Components/Menu/MenuPage';
import AboutPage from './Components/About/AboutPage';
import CartPage from './Components/Cart/CartPage';
import CheckOut from './Components/Cart/CheckOut';
import AdminHome from './Components/Admin/AdminHome';

// import Call APIs
import { AuthProvider } from './Components/service/AuthProvider';
import { UserInfoProvider } from './Components/service/UserInfoProvider';
import { CartProvider } from './Components/service/CartProvider';

const App = () => {
  return (
    <AuthProvider>
      <UserInfoProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/loginSignupPage" element={<LoginSignupPage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/admin" element={<AdminHome />} />
          </Routes>
        </CartProvider>
      </UserInfoProvider>
    </AuthProvider>
  )
}

export default App