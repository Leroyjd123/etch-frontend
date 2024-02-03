const initialState = []

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_QUESTIONS": {
      return [...action.payload]
    }
    case "ADD_QUESTION": {
      return [...state, action.payload]
    }
    case "EDIT_QUESTION": {
      return state.map((question) => {
        if (question._id === action.payload._id) {
          return action.payload
        }
        return question
      })
    }
    case "DELETE_QUESTION": {
      return state.filter((question) => question._id !== action.payload._id)
    }
    case "UPDATE_QUESTIONS": {
      return [...action.payload]
    }
    case "CLEAR_QUESTIONS": {
      return []
    }
    default: {
      return state
    }
  }
}

export default questionsReducer
