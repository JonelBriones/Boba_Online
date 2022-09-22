import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalState'

export const Cart = () => {
  const { cart, addToCart, removeFromCart, cartQty, itemsPrice, trash } =
    useContext(GlobalContext)
  console.log(cart)
  return (
    <div id="drink">
      <div className="drink__container cart">
        <div className="drink__container">
          <h1>Your Cart ({cartQty})</h1>
          <div className="drink__container grid cart">
            {cart.map((drink) => (
              <div key={drink._id} className="drink__card cart">
                <div className="btn__trash" onClick={() => trash(drink)}>
                  <img src="https://img.icons8.com/windows/32/000000/trash.png" />
                </div>
                <div className="drink__info">
                  <p>{drink.name}</p>
                  <p>"{drink.description}"</p>
                  <p>${drink.price}</p>
                </div>
                <img src="" alt="" className="drink__img" />
                <div className="btn__container">
                  <button
                    className={drink.qty > 1 ? 'btn' : 'btn disabled'}
                    onClick={() => removeFromCart(drink)}
                    disabled={drink.qty === 1}>
                    -
                  </button>
                  <h4 className="drink__qty">{drink.qty}</h4>
                  <button className="btn add" onClick={() => addToCart(drink)}>
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Link to={'../shop'}>
            <button className="btn checkout">Add more items</button>
          </Link>
        </div>
        {cart.length > 0 ? (
          <div className="cart__summary">
            <h1>Total: ${itemsPrice}</h1>
            <div className="cart__summary">
              <p>Time to pick up</p>
              <p>Add a tip</p>
              <button className="btn">Checkout</button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
