import React, { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'

export const EditDrink = () => {
  const {
    showEditDrink,
    setShowEditDrink,
    addToCart,
    addDrink,
    // toppings
  } = useContext(GlobalContext)
  // const [toppingsQty, setToppingsQty] = useState(0)
  const [allToppings, setAllToppings] = useState([
    { _id: 0, name: 'no toppings', price: 0, checked: false },
    { _id: 1, name: 'boba', price: 0.75, checked: false },
    { _id: 2, name: 'double boba', price: 1.5, checked: false },
    { _id: 3, name: 'aloe jelly', price: 0.65, checked: false },
    { _id: 4, name: 'mango boba', price: 0.65, checked: false },
  ])
  const [drink, setDrink] = useState(showEditDrink)
  // const [toppings, setToppings] = useState([
  //   { _id: 1, name: 'pearls', price: 0.5, qty: 0 },
  //   { _id: 2, name: 'aloe', price: 0.5, qty: 0 },
  //   { _id: 3, name: 'sea salt creamer', price: 1, qty: 0 },
  // ])
  // const total = allToppings.reduce((total, item) => (total + item.price, 0))
  const [qty, setQty] = useState(1)

  const total = allToppings.reduce(
    (total, item) => total + (item.checked ? item.price * qty : 0),
    showEditDrink.price
  )

  const addTopping = () => {
    let toppings = []
    for (let i = 0; i < allToppings.length; i++) {
      if (allToppings[i].checked) {
        toppings.push(allToppings[i])
        console.log(allToppings[i])
      }
    }
    console.log(toppings)
    console.log({ ...drink, toppings, price: total, qty: qty })
    addDrink({ ...drink, toppings, price: total, qty: qty })
  }
  // const [topping, setToppings] = useState([])
  const toppingChecked = (toggleTopping) => {
    setAllToppings(
      allToppings.map((t) =>
        t._id === toggleTopping._id ? { ...t, checked: !t.checked } : t
      )
    )
    if (toggleTopping._id === 0) {
      setAllToppings(
        allToppings.map((t) =>
          t._id !== 0 ? { ...t, checked: false } : { ...t, checked: !t.checked }
        )
      )
    }
  }
  const maxed = allToppings.reduce(
    (total, item) => total + (item.checked ? 1 : 0),
    0
  )
  // console.log(maxed)
  return (
    <>
      <div className="edit">
        <div className="edit__container">
          <h1>{showEditDrink.name}</h1>
          <div className="drinkType__container">
            <label htmlFor="drinkType">Select an option</label>
            <select className="drinkType" name="drinkType" id="drinkType">
              <option value="1">16oz ICED</option>
              <option value="2">24oz ICED</option>
              <option value="3">16oz HOT</option>
            </select>
            <div className="toppings__btn">
              <button
                className={qty !== 1 ? 'toppings btn' : 'toppings btn disabled'}
                onClick={() => setQty(qty !== 1 ? qty - 1 : qty)}>
                -
              </button>
              <h4 className="">{qty}</h4>
              <button className="toppings btn" onClick={() => setQty(qty + 1)}>
                +
              </button>
            </div>
          </div>

          <div>
            <h4>Topping Selection</h4>
            <span>Select 3</span>
          </div>
          {allToppings.map((topping, idx) => (
            <div className="toppingSelection__container" key={idx}>
              {topping._id !== allToppings[0]._id ? (
                <div
                  className={
                    allToppings[0].checked || (!topping.checked && maxed > 2)
                      ? 'toppingSelection__options disabled'
                      : 'toppingSelection__options'
                  }>
                  <div className="topping__toggle">
                    <input
                      type="checkbox"
                      disabled={
                        allToppings[0].checked ||
                        (!topping.checked && maxed > 2)
                      }
                      value={topping.name}
                      className="topping__toggle"
                      onChange={() => toppingChecked(topping)}
                    />
                    <label htmlFor="selectTopping">
                      {topping.name} {topping.checked ? 'true' : 'false'}
                    </label>
                  </div>
                  <p className="topping__toggle">
                    {topping.price ? `$${topping.price}` : null}
                  </p>
                </div>
              ) : null}
            </div>
          ))}
          {/* NO TOPPINGS */}
          <div className="toppingSelection__container">
            <div className="toppingSelection__options">
              <div className="">
                <input
                  type="checkbox"
                  value={allToppings[0].name}
                  className=""
                  onChange={() => toppingChecked(allToppings[0])}
                />
                <label htmlFor="selectTopping">
                  {allToppings[0].name}{' '}
                  {allToppings[0].checked ? 'true' : 'false'}
                </label>
              </div>
              <p className="">
                {allToppings[0].price ? `$${allToppings[0].price}` : null}
              </p>
            </div>
          </div>
          <p>Total ${parseFloat(total * qty).toFixed(2)}</p>
          <button
            className="btn add__cart"
            onClick={() => (addTopping(), setShowEditDrink({}))}>
            Add to cart
          </button>
          {/* <button
              onClick={() => setShowEditDrink({})}
              className="drink__exit">
              V
            </button> */}
          <img
            src="https://img.icons8.com/material-outlined/24/000000/cancel--v1.png"
            onClick={() => setShowEditDrink({})}
            className="drink__exit"
          />
        </div>
      </div>
    </>
  )
}
