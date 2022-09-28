import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalState'

export const Cart = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    cartQty,
    trash,
    currentTip,
    onToggleTip,
    totalCartPriceWithTip,
    totalCartPrice,
    setTip,
    addTip,
  } = useContext(GlobalContext)
  // console.log(cart)

  // console.log(tip)
  return (
    <div id="cart" className="cart__container">
      <div className="cart__left">
        <h1>Your Cart ({cartQty})</h1>
        {cart.map((drink, idx) => (
          <div key={idx} className="cart__card">
            <div className="cart_info">
              <p>{drink.name}</p>
              {drink.toppings.length > 0 ? (
                <>
                  {drink.toppings.map((topping) => (
                    <p key={topping._id} className="cart__toppings">
                      {topping.name}
                    </p>
                  ))}
                </>
              ) : (
                <p className="cart__toppings">no toppings</p>
              )}
              <p>${parseFloat(drink.price * drink.qty).toFixed(2)}</p>
            </div>
            <div>
              <img src={drink.img} alt="" className="cart_img" />
            </div>
            <div className="btn__container">
              <button
                className={drink.qty > 1 ? 'btn' : 'btn disabled'}
                onClick={() => removeFromCart(drink, idx)}
                disabled={drink.qty === 1}>
                -
              </button>
              <h4 className="drink__qty">{drink.qty}</h4>
              <button className="btn add" onClick={() => addToCart(drink, idx)}>
                +
              </button>
            </div>
            <div className="btn__trash" onClick={() => trash(drink, idx)}>
              <img src="https://img.icons8.com/windows/32/000000/trash.png" />
            </div>
          </div>
        ))}
        <Link to={'../shop'}>
          <button className="btn more">Add more items</button>
        </Link>
      </div>
      {cart.length > 0 ? (
        <div className="cart__right">
          <h1>Total: ${totalCartPriceWithTip}</h1>
          {/* <h1>Tip: ${tip}</h1> */}
          <div className="cart__summary">
            <p>Time to pick up</p>
            <div className="cart__tip">
              <h5>ADD A TIP</h5>
              <div className="btn__tip">
                {/* <input type="radio" className="tip" /> */}
                <button
                  className={
                    currentTip[0].isToggled ? 'btn tip active' : 'btn tip'
                  }
                  onClick={() => onToggleTip(0, totalCartPrice * 0.1)}>
                  <span>10%</span>
                  <span>+${(totalCartPrice * 0.1).toFixed(2)}</span>
                </button>
                <button
                  className={
                    currentTip[1].isToggled ? 'btn tip active' : 'btn tip'
                  }
                  onClick={() => onToggleTip(1, totalCartPrice * 0.15)}>
                  <span>15%</span>
                  <span>+${(totalCartPrice * 0.15).toFixed(2)}</span>
                </button>
                <button
                  className={
                    currentTip[2].isToggled ? 'btn tip active' : 'btn tip'
                  }
                  onClick={() => onToggleTip(2, totalCartPrice * 0.2)}>
                  <span>20%</span>
                  <span>+${(totalCartPrice * 0.2).toFixed(2)}</span>
                </button>
                <button
                  className={
                    currentTip[3].isToggled ? 'btn tip active' : 'btn tip'
                  }
                  onClick={() => onToggleTip(3, 0)}>
                  {addTip && currentTip[3].isToggled ? '$' + addTip : 'Other'}
                </button>
              </div>
              {currentTip[3].isToggled ? (
                <>
                  <input
                    type="number"
                    step={0.01}
                    min={1}
                    max={100}
                    placeholder="$1.00"
                    className={
                      addTip === 0 || addTip > 0.99
                        ? 'btn other active'
                        : 'btn other error'
                    }
                    onChange={(e) => setTip(e.target.value * 1)}
                  />
                  {addTip ? (
                    <label htmlFor="tipAmount" className="tip__error">
                      {addTip > 0.99 && addTip < 101 ? null : 'values 1-100'}
                    </label>
                  ) : null}
                </>
              ) : (
                <input type="number" className="btn other disabled" />
              )}
            </div>
            <button className="btn checkout">Checkout</button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
