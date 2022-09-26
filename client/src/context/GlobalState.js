import React, { createContext, useContext, useReducer, useState } from 'react'
import AppReducer from './AppReducer'

const initialState = {
  drinks: [
    {
      _id: 1,
      name: 'Milk Tea',
      price: 5,
      description: 'Milk tea with creamer',
      qty: 0,
    },
    {
      _id: 2,
      name: 'Black Tea',
      price: 5,
      description: 'Just Black tea',
      qty: 0,
    },
    {
      _id: 3,
      name: 'Green Tea',
      price: 5,
      description: 'Green tea with creamer',
      qty: 0,
    },
  ],
  cart: [
    {
      _id: 1,
      name: 'Milk Tea',
      price: 5,
      description: 'Milk tea with creamer',
      qty: 1,
    },
    // {
    //   _id: 3,
    //   name: 'Green Tea',
    //   cost: 5,
    //   description: 'Green tea with creamer',
    // },
    // {
    //   _id: 2,
    //   name: 'Black Tea',
    //   cost: 5,
    //   description:
    //     'Green tea with creamerGreen tea with creamer Green tea with creamer',
    // },
  ],
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalContext, initialState)
  const [cart, setCart] = useState([])
  const [cartQty, setQty] = useState(0)
  const [addTip, setTip] = useState(0)
  const [tipActive, setTipActive] = useState({})
  const [currentTip, setCurrentTip] = useState([
    {
      idx: 0,
      isToggled: false,
    },
    {
      idx: 1,
      isToggled: false,
    },
    {
      idx: 2,
      isToggled: false,
    },
    {
      idx: 3,
      isToggled: false,
    },
  ])
  const totalCartPrice = cart.reduce((a, c) => a + c.price * c.qty, 0)
  const totalCartPriceWithTip = parseFloat(totalCartPrice + addTip).toFixed(2)
  console.log(
    'without tip: ',
    totalCartPrice,
    'with tip: ',
    totalCartPrice + addTip
  )
  //   const taxPrice = itemsPrice * 0.0725
  //   const taxPriceParsed = parseFloat(itemsPrice * 0.0725).toFixed(2)
  //   const shippingPrice = itemsPrice > 200 ? 20 : 0
  //   const totalPrice = parseFloat(itemsPrice + taxPrice + shippingPrice).toFixed(
  //     2
  //   )
  const trash = (productObject) => {
    const exist = cart.find((product) => product._id === productObject._id)
    setCart(cart.filter((product) => product._id !== productObject._id))
    setQty(cartQty - exist.qty)
    if (cart.length === 1 && tipActive) {
      tipActive.isToggled = false
      setTip(0)
    }
  }
  const addToCart = (productObject) => {
    // is our product already in the cart?
    const exist = cart.find((product) => product._id === productObject._id)
    // if true, add 1 to quantity key value pair for every time it exist/added
    if (exist) {
      setCart(
        cart.map((product) =>
          //find the matching added product from the cart and increment the qty
          product._id === productObject._id
            ? { ...exist, qty: exist.qty + 1 }
            : product
        )
      )
    }
    // else, add to cart and iniate item quantity key value pair
    else {
      setCart([...cart, { ...productObject, qty: 1 }])
    }

    setQty(cartQty + 1)
  }
  const removeFromCart = (productObject) => {
    const exist = cart.find((product) => product._id === productObject._id)
    // if qty equals 0 stop decrementing
    if (exist.qty === 1) {
      setCart(
        cart.filter(
          (product) =>
            //find the matching added product from the cart and increment the qty
            product._id !== productObject._id
        )
      )
    } else {
      // map into cart and find matching object
      setCart(
        cart.map((product) =>
          product._id === productObject._id
            ? { ...product, qty: product.qty - 1 }
            : product
        )
      )
    }
    setQty(cartQty - 1)
  }

  // TOGGLE TIP BUTTON ON AND OFF

  const onToggleTip = (idx, amount) => {
    console.log(amount)
    currentTip.map((tip) => {
      if (tip.idx === idx) {
        tip.isToggled = !tip.isToggled
        console.log(tip)
        if (tip.isToggled) {
          setTipActive(tip)
          setTip(amount)
        } else {
          setTipActive({})
          setTip(0)
        }
      } else {
        tip.isToggled = false
      }
    })
    console.log(currentTip)
  }
  return (
    <GlobalContext.Provider
      value={{
        drinks: state.drinks,
        removeFromCart,
        addToCart,
        cart,
        cartQty,
        trash,
        tipActive,
        onToggleTip,
        currentTip,
        totalCartPrice,
        totalCartPriceWithTip,
        setTip,
        addTip,
      }}>
      {children}
    </GlobalContext.Provider>
  )
}
