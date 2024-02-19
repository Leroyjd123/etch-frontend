import PieChart from "../nivoComponents/PieChart"
import { useDispatch } from "react-redux"

import { useState, useEffect } from "react"
import axios from "../config/axios"

import {
  asyncTagCount,
  asyncTopQuestions,
  asyncAnswersStreak,
} from "../actions/metricsActions"
import CalendarChart from "../nivoComponents/CalendarChart"

const MetricsPage = () => {
  const [tagsData, setTagsData] = useState([])
  const [questionsData, setQuestionsData] = useState([])
  const [answersData, setAnswersData] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      try {
        const response = await dispatch(asyncTagCount)
        const newArray = response.data.splice(0, 10).map((ele) => ({
          id: ele.tag,
          label: ele.tag,
          value: ele.count,
        }))
        setTagsData(newArray)

        const questionResponse = await dispatch(asyncTopQuestions)
        setQuestionsData(questionResponse.data)

        const answerResponse = await dispatch(asyncAnswersStreak)
        setAnswersData(answerResponse.data)
      } catch (e) {
        console.log("error", e)
      }
    })()
  }, [])

  return (
    <div className="m-5 flex flex-wrap  md:flex-row justify-center items-center gap-3">
      <div className="block">
        <h1 className="card-title">Calendar Streak</h1>
        <CalendarChart
          data={answersData}
        />
      </div>

      <div className="block">
        <h1 className="card-title">Your top 10 tags</h1>
        <PieChart data={tagsData} />
      </div>

      <div className="block">
        <h1 className="card-title">Your top 10 questions</h1>
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Count</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {questionsData.map((question, index) => (
              <tr key={question.questionID}>
                <td>{index + 1}</td>
                <td>{question.label}</td>
                <td>{question.count}</td>
                <td>{question.tags.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MetricsPage
