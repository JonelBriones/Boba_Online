import React, { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'

export const EditDrink = () => {
  const { showEditDrink, setShowEditDrink, addDrink } =
    useContext(GlobalContext)
  const [allToppings, setAllToppings] = useState([
    { _id: 0, name: 'no toppings', price: 0, checked: false },
    { _id: 1, name: 'boba', price: 0.75, checked: false },
    { _id: 2, name: 'double boba', price: 1.5, checked: false },
    { _id: 3, name: 'aloe jelly', price: 0.65, checked: false },
    { _id: 4, name: 'mango boba', price: 0.65, checked: false },
  ])
  const [sugar, setSugar] = useState('')
  const [drinkType, setDrinkType] = useState('')
  const [qty, setQty] = useState(1)
  const total = allToppings.reduce(
    (total, item) => total + (item.checked ? item.price * qty : 0),
    showEditDrink.price
  )
  const addTopping = () => {
    if (drinkType && sugar !== '' && maxed > 0) {
      let toppings = []
      for (let i = 0; i < allToppings.length; i++) {
        if (allToppings[i].checked) {
          toppings.push(allToppings[i])
        }
      }
      addDrink({
        ...showEditDrink,
        toppings,
        price: total,
        qty,
        sugar,
        drinkType,
      })
      setShowEditDrink({})
    }
  }
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
  return (
    <>
      <div className="edit">
        <div className="edit__container">
          <h1>{showEditDrink.name}</h1>
          <div className="drinkType__container">
            <div
              className={
                drinkType ? 'edit__required transition' : 'edit__required'
              }>
              <label htmlFor="drinkType">Select an option</label>
              <span>1 Required</span>
            </div>

            <select
              className="drinkType"
              name="drinkType"
              id="drinkType"
              value={drinkType}
              onChange={(e) => setDrinkType(e.target.value)}>
              <option value="" disabled>
                Select One
              </option>
              <option value="16oz iced">16oz ICED</option>
              <option value="24oz iced">24oz ICED</option>
              <option value="16oz hot">16oz HOT</option>
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
          <div
            className={
              maxed > 0 ? 'edit__required transition' : 'edit__required'
            }>
            <h4>Topping Selection</h4>
            <span>1 Required</span>
          </div>
          <span>Select 3</span>
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
          <div className="drinkType__container">
            <div
              className={
                sugar ? 'edit__required transition' : 'edit__required'
              }>
              <h4>Sweetness (0-100%)</h4>
              <span>1 Required</span>
            </div>
            <select
              className="drinkType"
              name="sugar"
              id="sugar"
              value={sugar}
              onChange={(e) => setSugar(e.target.value)}>
              <option value="" disabled>
                Select one
              </option>
              <option value="100">100%</option>
              <option value="75">75%</option>
              <option value="50">50% (recommended)</option>
              <option value="25">25%</option>
              <option value="0">0%</option>
            </select>
          </div>
          <p>Total ${parseFloat(total * qty).toFixed(2)}</p>
          <button className="btn add__cart" onClick={() => addTopping()}>
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
