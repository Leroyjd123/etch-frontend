import axios from "../config/axios"

const SET_USER = "SET_USER"
const UPDATE_USER = "UPDATE_USER"
const CLEAR_USER = "CLEAR_USER"

const API_ENDPOINT = "/api/user"

/*
 * Asynchronously fetches user details and dispatches them to the Redux store.
 */

export const asyncSetUser = () => async (dispatch) => {
  try {
    const response = await axios.get(API_ENDPOINT)
    dispatch(setUser(response.data))
  } catch (error) {
    console.error("Error fetching user details:", error)
  }
}

/*
 * Creates an action to set the user details in the Redux store.
 */
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
})

/*
 * Asynchronously updates user details and updates the Redux store.
 */
export const asyncUpdateUser = (formData) => async (dispatch) => {
  try {
    const response = await axios.put(API_ENDPOINT, formData, {
      headers: { Authorization: localStorage.getItem("token") },
    })
    dispatch(updateUser(response.data))
  } catch (error) {
    console.error("Error updating user details:", error)
  }
}

/*
 * Creates an action to update the user details in the Redux store.
 */
export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
})

/*
 * Creates an action to clear the user details from the Redux store.
 */
export const clearUser = () => ({
  type: CLEAR_USER,
})
