import axios from "axios"
const port = 3999
const url = `http://localhost:${port}`
export default axios.create({
  baseURL: url,
  headers: {
    Authorization: localStorage.getItem("token"),
  },
})
