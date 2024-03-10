import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "../config/axios"
import moment from "moment"
import CalendarDate from "../formComponents/CalendarDate"

const AnswerListingPage = () => {
  const questions = useSelector((state) => state.questions)
  const [answerList, setAnswerList] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/answers")
        setAnswerList(response.data)
      } catch (error) {
        console.error("Error fetching answers:", error)
      }
    }

    fetchData()
  }, [])

  const formattedSelectedDate = moment(selectedDate).format("YYYY-MM-DD")
  const filteredAnswers = answerList.filter((answer) =>
    moment(answer.date).isSame(formattedSelectedDate, "day")
  )

  const findQuestionLabelById = (questionId) => {
    const question = questions.find((q) => q._id === questionId)
    return question ? question.label : "Question not found"
  }

  return (
    <>
      <h1 className="text-lg font-semibold">Answer Listing</h1>
      <CalendarDate
        type="calendar"
        onChange={setSelectedDate}
        value={selectedDate}
      />
      <h1 className="mt-4 mb-2 text-lg font-semibold">
        Your answers on {moment(selectedDate).format("MMMM Do, YYYY")}
      </h1>
      {filteredAnswers.length > 0 ? (
        <div className="md:flex hidden">
          <table className="table table-zebra table-auto w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Entries</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              {filteredAnswers.map((answer, index) => (
                <tr key={answer._id}>
                  <td>{index + 1}</td>
                  <td>{findQuestionLabelById(answer.questionId)}</td>
                  <td>{answer.entries.join(", ")}</td>
                  <td>{answer.tags.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No answers found for this date.</p>
      )}

      <div className="md:hidden">
        {filteredAnswers.map((answer, index) => (
          <div key={index} className="collapse collapse-plus mb-2 ">
            <input type="checkbox" className="peer" />
            <div className="collapse-title bg-accent text-primary-content ">
              {findQuestionLabelById(answer.questionId)}
            </div>
            <div className=" collapse-content bg-accent text-primary-content  gap-2">
              <p className="text-sm mb-2">{answer.entries.join(", ")}</p>
              <div className="flex flex-wrap gap-2">
                {answer.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="badge badge-outline">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default AnswerListingPage
