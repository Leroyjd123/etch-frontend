const initialState = {}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...action.payload,
      }
    }
    case "UPDATE_USER": {
      return {
        ...action.payload,
      }
    }
    case "CLEAR_USER": {
      return {}
    }
    default: {
      return state
    }
  }
}

export default userReducer
