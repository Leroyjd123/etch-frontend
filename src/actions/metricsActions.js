import axios from "../config/axios"

const API_ENDPOINT = "/api/metrics/"

/*
 * Fetches the count of tags from the server.
 */
export const asyncTagCount = async () => {
  try {
    return await axios.get(`${API_ENDPOINT}tags`)
  } catch (e) {
    console.error("Error fetching top tags", e)
  }
}

/*
 * Fetches the top questions from the server.
 */
export const asyncTopQuestions = async () => {
  try {
    return await axios.get(`${API_ENDPOINT}questions`)
  } catch (e) {
    console.error("Error fetching top questions", e)
  }
}

/*
 * Fetches the current answers streak from the server.
 */
export const asyncAnswersStreak = async () => {
  try {
    return await axios.get(`${API_ENDPOINT}answers`)
  } catch (e) {
    console.error("Error fetching answers streak", e)
  }
}
