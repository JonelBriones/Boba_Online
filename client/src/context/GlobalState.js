import React, { createContext, useReducer, useState } from 'react'
import AppReducer from './AppReducer'

const initialState = {
  drinks: [
    {
      id: 1,
      name: 'Milk Tea',
      cost: 5,
      description: 'Milk tea with creamer',
    },
    {
      id: 2,
      name: 'Black Tea',
      cost: 5,
      description: 'Just Black tea',
    },
    {
      id: 3,
      name: 'Green Tea',
      cost: 5,
      description: 'Green tea with creamer',
    },
  ],
  cart: [
    {
      id: 1,
      name: 'Milk Tea',
      cost: 5,
      description: 'Milk tea with creamer',
    },
    {
      id: 3,
      name: 'Green Tea',
      cost: 5,
      description: 'Green tea with creamer',
    },
  ],
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  //   DELETE FROM CART
  function deleteFromCart(id) {
    dispatch({
      type: 'DELETE',
      payload: id,
    })
  }
  //   ADD TO CART

  function addToCart(drink) {
    dispatch({
      type: 'ADD',
      payload: drink,
    })
  }
  return (
    <GlobalContext.Provider
      value={{
        drinks: state.drinks,
        deleteFromCart,
        addToCart,
        cart: state.cart,
      }}>
      {children}
    </GlobalContext.Provider>
  )
}
