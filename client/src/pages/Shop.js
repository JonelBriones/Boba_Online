import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

export const Shop = () => {
  const { drinks, addDrink, deleteDrink } = useContext(GlobalContext)
  return (
    <div id="drink">
      <div className="drink__container">
        <h1>Build your drink</h1>
        <div className="drink__container grid">
          {drinks.map((drink) => (
            <div key={drink.id} className="drink__card">
              <div className="drink__info">
                <p>{drink.name}</p>
                <p>"{drink.description}"</p>
                <p>${drink.cost}</p>
              </div>
              <img src="" alt="" />
              <button onClick={() => addDrink(drink.id)}>Add</button>
              <button onClick={() => deleteDrink(drink.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
