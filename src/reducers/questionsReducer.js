const initialState = []

/**
 * Reducer for handling actions related to questions.
 */
const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_QUESTIONS":
      return [...action.payload]
    case "ADD_QUESTION":
      return [...state, action.payload]
    case "EDIT_QUESTION":
      return state.map((question) =>
        question._id === action.payload._id ? action.payload : question
      )
    case "DELETE_QUESTION":
      return state.filter((question) => question._id !== action.payload._id)
    case "CLEAR_QUESTIONS":
      return initialState
    default:
      return state
  }
}

export default questionsReducer
