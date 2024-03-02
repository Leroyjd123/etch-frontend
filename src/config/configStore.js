// Importing necessary functions from redux to create the store and middleware
import { createStore, combineReducers, applyMiddleware } from "redux"

// Importing individual reducers
import userReducer from "../reducers/userReducer"
import questionsReducer from "../reducers/questionsReducer"
import answersReducer from "../reducers/answersReducer"

import { thunk } from "redux-thunk"

// Function to configure and create the Redux store
const configureStore = () => {
  // Combining reducers to form a single rootReducer
  const rootReducer = combineReducers({
    user: userReducer,
    questions: questionsReducer,
    answers: answersReducer,
  })

  const store = createStore(rootReducer, applyMiddleware(thunk))

  return store
}

export default configureStore
