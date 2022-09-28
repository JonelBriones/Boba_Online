import React, { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { EditDrink } from './EditDrink'

export const Shop = () => {
  const {
    drinks,
    addToCart,
    addDrink,
    cartQty,
    cart,
    showEditDrink,
    setShowEditDrink,
  } = useContext(GlobalContext)
  return (
    <div id="drink">
      <div className="drink__container">
        {showEditDrink._id ? (
          <div className="drink__edit">
            <EditDrink />
          </div>
        ) : null}
        <h1>Build your drink</h1>
        <div className="drink__grid">
          {drinks.map((drink) => (
            <div
              key={drink._id}
              className="drink__card"
              onClick={() => setShowEditDrink(drink)}>
              <div className="drink__info">
                <p>{drink.name}</p>
                <p>"{drink.description}"</p>
                <p>${parseFloat(drink.price).toFixed(2)}</p>
              </div>
              <img src={drink.img} alt="" className="drink__img" />
              <div className="btn__container shop">
                {/* {cart.map((d) =>
                  d._id === drink._id ? (
                    <h4 className="drink__qty shop" key={drink._id}>
                      {d.qty}
                    </h4>
                  ) : null
                )} */}
                {/* <button
                  className="btn add fixed"
                  onClick={() => addToCart(drink)}>
                  Add
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
