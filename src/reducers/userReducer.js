const initialState = {}

/**
 * Handles actions related to the user state in the Redux store.
 */
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
    case "UPDATE_USER":
      return {
        ...state,
        ...action.payload,
      }
    case "CLEAR_USER":
      return initialState
    default:
      return state
  }
}

export default userReducer
