import { createStore, combineReducers, applyMiddleware } from "redux"
import userReducer from "../reducers/userReducer"
import questionsReducer from "../reducers/questionsReducer"

import { thunk } from "redux-thunk"

const configureStore = () => {
  const store = createStore(
    combineReducers({
      user: userReducer,
      questions: questionsReducer,
    }),
    applyMiddleware(thunk)
  )
  return store
}

export default configureStore
