export default (state, action) => {
  switch (action.type) {
    case 'DELETE':
      return {
        ...state,
        cart: state.cart.filter((drink) => drink.id !== action.payload),
      }
    case 'ADD':
      return {
        ...state,
        drinks: [action.payload, ...state.cart],
      }
    default:
      return state
  }
}
