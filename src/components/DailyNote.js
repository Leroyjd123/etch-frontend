import { Formik, Form } from "formik"
import * as Yup from "yup"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"
import QuestionForm from "../tailwindComponents/QuestionForm"
import { asyncAddAnswers } from "../actions/answersActions"
import CalendarDate from "../tailwindComponents/CalendarDate"

const DailyNote = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const [selectedDate, setSelectedDate] = useState(Date())

  const questionList = useSelector((state) => state.questions)
    .filter((question) => question.tags.includes("daily review"))
    .sort((a, b) => a.order - b.order)

  const [questions, setQuestions] = useState(questionList.slice(0, 3))

  const initialValues = questions.reduce((values, question) => {
    values[question._id] = question.inputType === "checkbox" ? [] : ""
    return values
  }, {})

  const validationSchema = Yup.object().shape(
    questions.reduce((schema, question) => {
      schema[question.name] = question.validation
      return schema
    }, {})
  )

  const addQuestion = () => {
    if (user.userType !== "subscribedUser") {
      alert("Please purchase a subscription to add more questions.")
      return
    }

    // Filter questions that are not already in the current list
    const availableQuestions = questionList.filter(
      (question) => !questions.find((q) => q._id === question._id)
    )

    // Check if there are available questions to add
    if (availableQuestions.length === 0) {
      alert("There are no more questions to add.")
      return
    }

    // Pick a random question from the available ones
    const newQuestionIndex = Math.floor(
      Math.random() * availableQuestions.length
    )
    const newQuestion = availableQuestions[newQuestionIndex]

    // Update the state with the new question
    setQuestions([...questions, newQuestion])
  }

  const handleSubmit = async (values) => {
    const formValues = {
      date: new Date(selectedDate),
      entryList: Object.keys(values).flatMap((key) => {
        const value = values[key]
        if (Array.isArray(value) && value.some((val) => val.trim() !== "")) {
          return [
            {
              questionID: key,
              entries: value.filter((val) => val.trim() !== ""),
            },
          ]
        } else if (typeof value === "string" && value.trim() !== "") {
          return [
            {
              questionID: key,
              entries: [value.trim()],
            },
          ]
        } else {
          return []
        }
      }),
    }

    if (formValues.entryList.length === 0) {
      alert("Please answer atleast one question!")
    } else {
      dispatch(asyncAddAnswers(formValues))
      alert("Your daily note has been saved!")
      navigate("/dashboard")
    }
  }

  return (
    <div className=" flex flex-col md:flex-row">
      <div className="flex-grow p-5 overflow-auto">
        <p className="text-lg font-semibold">How was Your Day?</p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log()
            handleSubmit(values)
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <CalendarDate
                type="date"
                onChange={(value) => setSelectedDate(value)}
                value={selectedDate}
              />

              {questions.map((question, i) => (
                <QuestionForm question={question} key={i} />
              ))}

              <div className="grid ">
                <button
                  onClick={addQuestion}
                  type="button"
                  className="btn w-full"
                >
                  Add More Question
                </button>
              </div>

              <div className="grid">
                <button type="submit" className="btn w-full">
                  Save Note
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default DailyNote
