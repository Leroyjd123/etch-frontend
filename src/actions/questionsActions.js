import axios from "../config/axios"

const API_ENDPOINT = "/api/question/"

export const asyncSetQuestions = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(API_ENDPOINT)
      dispatch(setQuestions(response.data))
    } catch (e) {
      console.log("Error fetching questions", e)
    }
  }
}

export const setQuestions = (questions) => {
  return {
    type: "SET_QUESTIONS",
    payload: questions,
  }
}

export const clearQuestions = () => {
  return {
    type: "CLEAR_QUESTIONS",
  }
}

export const asyncAddQuestion = (value) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(API_ENDPOINT, value)
      dispatch(addQuestion(response.data))
    } catch (e) {
      console.log("Error adding question", e)
    }
  }
}

export const addQuestion = (question) => {
  return {
    type: "ADD_QUESTION",
    payload: question,
  }
}

export const asyncEditQuestion = (value) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${API_ENDPOINT}${value._id}`, value)
      dispatch(editQuestion(response.data))
    } catch (e) {
      console.log("Error editing question", e)
    }
  }
}

export const editQuestion = (question) => {
  return {
    type: "EDIT_QUESTION",
    payload: question,
  }
}

export const asyncDeleteQuestion = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${API_ENDPOINT}${id}`)
      dispatch(deleteQuestion(response.data))
    } catch (e) {
      console.log("Error deleting question", e)
    }
  }
}

export const deleteQuestion = (question) => {
  return {
    type: "DELETE_QUESTION",
    payload: question,
  }
}
