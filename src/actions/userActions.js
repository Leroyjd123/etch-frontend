import axios from "../config/axios"

const API_ENDPOINT = "/api/user"

export const asyncSetUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(API_ENDPOINT)
      dispatch(setUser(response.data))
    } catch (e) {
      console.log("Error fetching user details", e)
    }
  }
}

export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  }
}

export const asyncUpdateUser = (formData) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(API_ENDPOINT, formData, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      dispatch(updateUser(response.data))
    } catch (e) {
      console.log("Error updating user details", e)
    }
  }
}

export const updateUser = (user) => {
  return {
    type: "UPDATE_USER",
    payload: user,
  }
}

export const clearUser = () => {
  return {
    type: "CLEAR_USER",
  }
}
