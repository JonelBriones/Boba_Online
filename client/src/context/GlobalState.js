import React, { createContext, useContext, useReducer, useState } from 'react'
import AppReducer from './AppReducer'

const initialState = {
  drinks: [
    {
      _id: 1,
      name: 'Black Tea',
      price: 5,
      description:
        'Our Boba Guys Blend No. 1 from Tea People. The staple of boba milk tea. Contains caffeine.',
      qty: 0,
      img: 'https://boba-guys.square.site/uploads/1/2/6/1/126110068/s634804415629712800_p774_i2_w1600.jpeg?width=160',
    },
    {
      _id: 2,
      name: 'Matcha Latte',
      price: 5,
      description:
        'Our organic premium-grade matcha from Tea People layered over your choice of milk and sweetener. Contains caffeine.',
      qty: 0,
      img: 'https://boba-guys.square.site/uploads/1/2/6/1/126110068/s634804415629712800_p784_i2_w1600.jpeg?width=160',
    },
    {
      _id: 3,
      name: 'Green Tea',
      price: 5,
      description:
        'Our Jasmine Green from Tea People. Floral and silky. Contains caffeine.',
      qty: 0,
      img: 'https://boba-guys.square.site/uploads/1/2/6/1/126110068/s634804415629712800_p775_i2_w1600.jpeg?width=160',
    },
  ],
  toppings: [
    { _id: 1, name: 'pearls', price: 0.5, qty: 0 },
    { _id: 2, name: 'aloe', price: 0.5, qty: 0 },
    { _id: 3, name: 'sea salt creamer', price: 1, qty: 0 },
  ],
  cart: [
    {
      _id: 1,
      name: 'Milk Tea',
      price: 5,
      description: 'Milk tea with creamer',
      qty: 1,
    },
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
  console.log(cart)
  console.log(
    'without tip: ',
    totalCartPrice,
    'with tip: ',
    totalCartPrice + addTip
  )
  const [showEditDrink, setShowEditDrink] = useState({})
  //   const taxPrice = itemsPrice * 0.0725
  //   const taxPriceParsed = parseFloat(itemsPrice * 0.0725).toFixed(2)
  //   const shippingPrice = itemsPrice > 200 ? 20 : 0
  //   const totalPrice = parseFloat(itemsPrice + taxPrice + shippingPrice).toFixed(
  //     2
  //   )
  const trash = (productObject, idx) => {
    // const exist = cart.find((product) => product._id === productObject._id)
    const exist = cart[idx]

    setCart(cart.filter((product, i) => i !== idx))
    setQty(cartQty - exist.qty)
    if (cart.length === 1 && tipActive) {
      tipActive.isToggled = false
      setTip(0)
    }
  }
  const addDrink = (productObject) => {
    console.log('adding drink with toppings: ', productObject)
    setCart([...cart, productObject])
    setQty(cartQty + productObject.qty)
    console.log(cart)
  }
  const addToCart = (productObject, idx) => {
    console.log('adding drink without toppings: ', productObject)
    // is our product already in the cart?
    // const exist = cart.find((product) => product._id === productObject._id)
    const exist = cart[idx]
    console.log('exist', exist)
    // if true, add 1 to quantity key value pair for every time it exist/added
    if (exist) {
      setCart(
        cart.map((product, i) =>
          //find the matching added product from the cart and increment the qty
          i === idx ? { ...exist, qty: exist.qty + 1 } : product
        )
      )
    }
    // else, add to cart and iniate item quantity key value pair
    else {
      setCart([...cart, { ...productObject, qty: 1 }])
    }

    setQty(cartQty + 1)
    console.log(cart)
  }
  const removeFromCart = (productObject, idx) => {
    // const exist = cart.find((product) => product._id === productObject._id)
    const exist = cart[idx]
    // if qty equals 0 stop decrementing
    if (exist.qty === 1) {
      setCart(
        cart.filter(
          (product, i) =>
            //find the matching added product from the cart and increment the qty
            i !== idx
        )
      )
    } else {
      // map into cart and find matching object
      setCart(
        cart.map((product, i) =>
          i === idx ? { ...product, qty: product.qty - 1 } : product
        )
      )
    }
    setQty(cartQty - 1)
  }

  const addTopping = (toppingId) => {
    const topping = state.toppings.find((t) => t._id === topping)
  }

  // TOGGLE TIP BUTTON ON AND OFF\

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
  //   const editDrink = (drink) => {
  //     console.log(drink)
  //     setShowEditDrink(drink)
  //     console.log(showEditDrink)
  //   }
  return (
    <GlobalContext.Provider
      value={{
        drinks: state.drinks,
        toppings: state.toppings,
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
        // editDrink,
        setShowEditDrink,
        showEditDrink,
        addTopping,
        addDrink,
      }}>
      {children}
    </GlobalContext.Provider>
  )
}
