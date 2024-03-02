import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import PieChart from "../nivoComponents/PieChart"
import CalendarChart from "../nivoComponents/CalendarChart"
import MetricsStat from "../appComponents/MetricsStat"
import {
  asyncTagCount,
  asyncTopQuestions,
  asyncAnswersStreak,
} from "../actions/metricsActions"

const MetricsPage = () => {
  const [tagsData, setTagsData] = useState([])
  const [questionsData, setQuestionsData] = useState([])
  const [answersData, setAnswersData] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      try {
        const response = await dispatch(asyncTagCount)
        const newArray = response.data.slice(0, 10).map((ele) => ({
          id: ele.tag,
          label: ele.tag,
          value: ele.count,
        }))
        setTagsData(newArray)

        const questionResponse = await dispatch(asyncTopQuestions)
        setQuestionsData(questionResponse.data.slice(0, 5))

        const answerResponse = await dispatch(asyncAnswersStreak)
        setAnswersData(answerResponse.data)
      } catch (e) {
        console.log("error", e)
      }
    })()
  }, [])

  return (
    <>
      <h1 className="text-lg font-semibold">Metrics</h1>

      <div className="m-2  flex-wrap md:flex-row justify-center items-center gap-3">
        <div className="block mb-6 w-full md:w-auto">
          <h1 className="card-title">Calendar Streak</h1>
          <MetricsStat className="mx-auto" data={answersData} />
          <div className="hidden md:block">
            <CalendarChart data={answersData} />
          </div>
        </div>

        <div className="block mb-6 w-full md:w-auto">
          <h1 className="card-title">Your top 10 tags</h1>
          <PieChart data={tagsData} />
        </div>

        <div className="block mb-6 w-full md:w-auto">
          <h1 className="card-title">Your top 5 questions</h1>
          <table className="table table-zebra w-full">
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
                <tr key={question.questionId}>
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
    </>
  )
}

export default MetricsPage
