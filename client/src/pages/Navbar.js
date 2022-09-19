import React, { useState } from 'react'
import { Link } from 'react-router-dom'
export const Navbar = () => {
  const [logoHide, setLogoHide] = useState(false)
  const onLogoScoll = () => {
    if (window.scrollY > 100) {
      setLogoHide(true)
    } else {
      setLogoHide(false)
    }
    console.log(window.scrollY)
  }
  window.addEventListener('scroll', onLogoScoll)
  return (
    <div className="navbar">
      <div className="navbar__container">
        {/* <h4 className={logoHide ? 'order' : 'order hide'}>ORDER NOW</h4> */}

        <a href="#content">
          <img
            src="../img/boba.png"
            alt="boba-drink-logo"
            className={logoHide ? 'logo hide' : 'logo'}
            id="logo"
          />
        </a>

        <ul>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            {/* <a href="">Shop</a> */}
            <Link to={'/shop'}>Shop</Link>
          </li>
          <li>
            <Link to={'/cart'}>Cart</Link>
          </li>
          <li>
            <a href="">About</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
