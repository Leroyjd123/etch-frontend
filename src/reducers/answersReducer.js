const initialState = []

const answersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ANSWERS": {
      return [...action.payload]
    }
    case "ADD_ANSWERS": {
      return [...state, action.payload]
    }
    case "CLEAR_ANSWERS": {
      return []
    }
    default: {
      return state
    }
  }
}

export default answersReducer
