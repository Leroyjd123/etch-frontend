import axios from "../config/axios"

const API_ENDPOINT = "/api/answers/"

export const asyncSetAnswers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(API_ENDPOINT)
      dispatch(setAnswers(response.data))
    } catch (e) {
      console.log("Error fetching answers", e)
    }
  }
}

export const setAnswers = (answers) => {
  return {
    type: "SET_ANSWERS",
    payload: answers,
  }
}

export const clearAnswers = () => {
  return {
    type: "CLEAR_ANSWERS",
  }
}

export const asyncAddAnswers = (value) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(API_ENDPOINT, value)
      dispatch(addAnswers(response.data))
    } catch (e) {
      console.log("Error adding answers", e)
    }
  }
}

export const addAnswers = (answers) => {
  return {
    type: "ADD_ANSWERS",
    payload: answers,
  }
}
