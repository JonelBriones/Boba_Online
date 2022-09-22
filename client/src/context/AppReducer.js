export default (state, action) => {
  switch (action.type) {
    case 'REMOVE_FROM_CART':
      console.log('deleting ', action.payload)

      return {
        ...state,
        cart: state.cart.filter((drink) => drink._id !== action.payload),
      }
    case 'ADD_TO_CART':
      console.log('state', ...state.cart)
      console.log('adding to cart', action.payload)
      return {
        ...state,
        cart: [{ ...action.payload, qty: 1 }, ...state.cart],
      }
    case 'ADD_TO_QTY':
      console.log('previous state', ...state.cart)
      console.log('adding to qty ', action.payload)
      console.log('current state', {
        ...state,
        cart: state.cart.map((d) =>
          d._id === action.payload ? { ...d, ...state.cart } : action.payload
        ),
      })
      return {
        ...state,
        cart: state.cart.map((d) =>
          d._id === action.payload
            ? { ...action.payload, ...state.cart }
            : action.payload
        ),
      }
    default:
      return state
  }
}
