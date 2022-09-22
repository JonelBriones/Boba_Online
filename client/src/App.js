import './App.css'
import './mobile.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './pages/Navbar'
import { Home } from './pages/Home'
import { Cart } from './pages/Cart'
import { Shop } from './pages/Shop'
import { GlobalProvider } from './context/GlobalState'

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <div className="container">
          <Navbar />
          <div className="content" id="content">
            <Routes>
              <Route element={<Home />} path="/" default />
              <Route element={<Shop />} path="/shop" />
              <Route element={<Cart />} path="/cart" />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
