import axios from "../config/axios"

const API_ENDPOINT = "/api/metrics/"

export const asyncTagCount = async () => {
  try {
    return await axios.get(`${API_ENDPOINT}tags`)
  } catch (e) {
    console.log("Error fetching top tags", e)
  }
}

export const asyncTopQuestions = async () => {
  try {
    return await axios.get(`${API_ENDPOINT}questions`)
  } catch (e) {
    console.log("Error fetching top questions", e)
  }
}

export const asyncAnswersStreak = async () => {
  try {
    return await axios.get(`${API_ENDPOINT}answers`)
  } catch (e) {
    console.log("Error fetching answers streak", e)
  }
}
