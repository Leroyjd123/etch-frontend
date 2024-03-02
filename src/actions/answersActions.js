import axios from "../config/axios"

const SET_ANSWERS = "SET_ANSWERS"
const CLEAR_ANSWERS = "CLEAR_ANSWERS"
const ADD_ANSWERS = "ADD_ANSWERS"

const API_ENDPOINT = "/api/answers/"

/*
 * Asynchronously fetches answers and dispatches them to the Redux store.
 */
export const asyncSetAnswers = () => async (dispatch) => {
  try {
    const response = await axios.get(API_ENDPOINT)
    dispatch(setAnswers(response.data))
  } catch (error) {
    console.error("Error fetching answers:", error)
  }
}

/*
 * Creates an action to set the answers in the Redux store.
 */
export const setAnswers = (answers) => ({
  type: SET_ANSWERS,
  payload: answers,
})

/*
 * Creates an action to clear the answers from the Redux store.
 */
export const clearAnswers = () => ({
  type: CLEAR_ANSWERS,
})

/*
 * Asynchronously adds new answers and updates the Redux store.
 */
export const asyncAddAnswers = (value) => async (dispatch) => {
  try {
    const response = await axios.post(API_ENDPOINT, value)
    dispatch(addAnswers(response.data))
  } catch (error) {
    console.error("Error adding answers:", error)
  }
}

/*
 * Creates an action to add answers to the Redux store.
 */
export const addAnswers = (answers) => ({
  type: ADD_ANSWERS,
  payload: answers,
})
