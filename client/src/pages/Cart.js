import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

export const Cart = () => {
  const { cart, addToCart, deleteFromCart } = useContext(GlobalContext)
  console.log(cart)
  return (
    <div id="drink">
      <div className="drink__container">
        <h1>Your Cart</h1>
        <div className="drink__container grid">
          {cart.map((drink) => (
            <div key={drink.id} className="drink__card">
              <div className="drink__info">
                <p>{drink.name}</p>
                <p>"{drink.description}"</p>
                <p>${drink.cost}</p>
              </div>
              <img src="" alt="" />
              <button onClick={() => addToCart(drink)}>Add</button>
              <button onClick={() => deleteFromCart(drink.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
    // <div>
    //   <h1>Your Cart</h1>
    //   <div>{cart.map((item) => item.name)}</div>
    //   {/* {cart} */}
    // </div>
  )
}
