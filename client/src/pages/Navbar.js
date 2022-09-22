import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalState'
export const Navbar = () => {
  const [logoHide, setLogoHide] = useState(false)
  const onLogoScoll = () => {
    if (window.scrollY > 100) {
      setLogoHide(true)
    } else {
      setLogoHide(false)
    }
    // console.log(window.scrollY)
  }
  window.addEventListener('scroll', onLogoScoll)
  const { cartQty } = useContext(GlobalContext)

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
          {/* <li>
            <Link to={'/'}>Home</Link>
          </li> */}
          <li>
            {/* <a href="">Shop</a> */}
            <Link to={'/shop'}>Shop</Link>
          </li>
          {/* <li>
            <a href="">About</a>
          </li> */}
          <li className="cart">
            <Link to={'/cart'}>
              <span>
                <img src="https://img.icons8.com/windows/32/000000/shopping-cart.png" />
                ({cartQty})
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
