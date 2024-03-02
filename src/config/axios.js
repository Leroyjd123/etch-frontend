// Importing Axios library for making HTTP requests
import axios from "axios"

// Configuration for the Axios instance
const port = 3999
const baseURL = `http://localhost:${port}`

// Creating an Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL, // Setting the base URL for all requests
})

// Interceptor to set the Authorization header for every request dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = token // Setting the Authorization header if the token exists
    }
    return config // Returning the config object with the Authorization header
  },
  (error) => {
    // Handling request error
    return Promise.reject(error)
  }
)

export default axiosInstance
