import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "../config/axios"
import moment from "moment"
import CalendarDate from "../tailwindComponents/CalendarDate"

const AnswerListingPage = () => {
  const questions = useSelector((state) => state.questions)
  const [answerList, setAnswerList] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/answers")
        setAnswerList(response.data)
      } catch (e) {
        console.error("Error fetching answers:", e)
      }
    }

    fetchData()
  }, [])

  const filteredAnswers = answerList.filter((answer) =>
    moment(answer.date).isSame(selectedDate, "day")
  )

  const findQuestionLabelById = (questionId) => {
    const question = questions.find((q) => q._id === questionId)
    return question ? question.label : "Question not found"
  }

  return (
    <>
      <CalendarDate
        type="calendar"
        onChange={setSelectedDate}
        value={selectedDate}
      />
      <>
        {moment(selectedDate).format("MMMM Do, YYYY")}
        {filteredAnswers.length > 0 ? (
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Question ID</th>
                <th>Entries</th>
                <th>Date</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              {filteredAnswers.map((answer, index) => (
                <tr key={answer._id}>
                  <td>{index + 1}</td>
                  <td>{findQuestionLabelById(answer.questionID)}</td>
                  <td>{answer.entries.join(", ")}</td>
                  <td>{moment(answer.date).format("MMMM Do, YYYY")}</td>
                  <td>{answer.tags.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No answers found for this date.</p>
        )}
      </>
    </>
  )
}

export default AnswerListingPage
