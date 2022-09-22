import React, { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'

export const Shop = () => {
  const { drinks, addToCart, cartQty, cart } = useContext(GlobalContext)
  return (
    <div id="drink">
      <div className="drink__container">
        <h1>Build your drink</h1>
        <div className="drink__grid">
          {drinks.map((drink) => (
            <div key={drink._id} className="drink__card">
              <div className="drink__info">
                <p>{drink.name}</p>
                <p>"{drink.description}"</p>
                <p>${drink.price}</p>
              </div>
              <img src="" alt="" className="drink__img" />
              <div className="btn__container shop">
                {cart.map((d) =>
                  d._id === drink._id ? (
                    <h4 className="drink__qty shop" key={drink._id}>
                      {d.qty}
                    </h4>
                  ) : null
                )}
                <button
                  className="btn add fixed"
                  onClick={() => addToCart(drink)}>
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
