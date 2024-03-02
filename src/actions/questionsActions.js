import axios from "../config/axios"

const SET_QUESTIONS = "SET_QUESTIONS"
const CLEAR_QUESTIONS = "CLEAR_QUESTIONS"
const ADD_QUESTION = "ADD_QUESTION"
const EDIT_QUESTION = "EDIT_QUESTION"
const DELETE_QUESTION = "DELETE_QUESTION"

const API_ENDPOINT = "/api/question/"

/*
 * Asynchronously fetches questions and dispatches them to the Redux store.
 */
export const asyncSetQuestions = () => async (dispatch) => {
  try {
    const response = await axios.get(API_ENDPOINT)
    dispatch(setQuestions(response.data))
  } catch (error) {
    console.error("Error fetching questions:", error)
  }
}

/*
 * Creates an action to set the questions in the Redux store.
 */
export const setQuestions = (questions) => ({
  type: SET_QUESTIONS,
  payload: questions,
})

/*
 * Creates an action to clear the questions from the Redux store.
 */
export const clearQuestions = () => ({
  type: CLEAR_QUESTIONS,
})

/*
 * Asynchronously adds a new question and updates the Redux store.
 */
export const asyncAddQuestion = (value) => async (dispatch) => {
  try {
    const response = await axios.post(API_ENDPOINT, value)
    dispatch(addQuestion(response.data))
  } catch (error) {
    console.error("Error adding question:", error)
  }
}

/*
 * Creates an action to add a question to the Redux store.
 */
export const addQuestion = (question) => ({
  type: ADD_QUESTION,
  payload: question,
})

/*
 * Asynchronously edits a question and updates the Redux store.
 */
export const asyncEditQuestion = (value) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_ENDPOINT}${value._id}`, value)
    dispatch(editQuestion(response.data))
  } catch (error) {
    console.error("Error editing question:", error)
  }
}

/*
 * Creates an action to edit a question in the Redux store.
 */
export const editQuestion = (question) => ({
  type: EDIT_QUESTION,
  payload: question,
})

/*
 * Asynchronously deletes a question and updates the Redux store.
 */
export const asyncDeleteQuestion = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_ENDPOINT}${id}`)
    dispatch(deleteQuestion(id)) // Assuming the response includes the ID of the deleted question
  } catch (error) {
    console.error("Error deleting question:", error)
  }
}

/*
 * Creates an action to delete a question from the Redux store.
 */
export const deleteQuestion = (id) => ({
  type: DELETE_QUESTION,
  payload: id,
})
