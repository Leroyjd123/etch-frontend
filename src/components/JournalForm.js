import { Formik, Form } from "formik"
import * as Yup from "yup"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"
import QuestionForm from "../tailwindComponents/QuestionForm"
import { asyncAddAnswers } from "../actions/answersActions"
import CalendarDate from "../tailwindComponents/CalendarDate"

const JournalForm = ({ mode, tagFilter, randomizeQuestions }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  )

  const user = useSelector((state) => state.user)
  const questionList = useSelector((state) => state.questions)

  const [questions, setQuestions] = useState([])

  useEffect(() => {
    let filteredQuestions = questionList

    if (!randomizeQuestions) {
      filteredQuestions = filteredQuestions.filter((question) =>
        question.tags.includes(tagFilter)
      )
    }

    if (randomizeQuestions) {
      filteredQuestions = [...filteredQuestions].sort(() => 0.5 - Math.random())
    }

    setQuestions(filteredQuestions.slice(0, 3))
  }, [questionList, tagFilter, randomizeQuestions])

  const initialValues = questions.reduce((values, question) => {
    values[question._id] = question.inputType === "checkbox" ? [] : ""
    return values
  }, {})

  const validationSchema = Yup.object(
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

    const notIncludedQuestions = questionList.filter(
      (question) =>
        !questions.find((q) => q._id === question._id) &&
        question.tags.includes(tagFilter)
    )

    const availableQuestions = randomizeQuestions
      ? notIncludedQuestions.sort(() => 0.5 - Math.random())
      : notIncludedQuestions

    if (availableQuestions.length > 0) {
      setQuestions((prev) => [...prev, availableQuestions[0]])
    } else {
      alert("There are no more questions to add.")
    }
  }

  const handleSubmit = async (values) => {
    const formValues = {
      date: new Date(selectedDate),
      entryList: Object.entries(values).flatMap(([key, value]) => {
        if (Array.isArray(value) && value.some((val) => val.trim() !== "")) {
          return {
            questionID: key,
            entries: value.filter((val) => val.trim() !== ""),
          }
        } else if (typeof value === "string" && value.trim() !== "") {
          return { questionID: key, entries: [value.trim()] }
        }
        return []
      }),
    }

    if (formValues.entryList.length > 0) {
      await dispatch(asyncAddAnswers(formValues))
      alert(
        mode === "note"
          ? "Your daily log has been saved!"
          : "Your daily introspection has been saved!"
      )
      navigate("/dashboard")
    } else {
      alert("Please answer at least one question!")
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-grow p-5 overflow-auto">
        <p className="text-lg font-semibold">
          {mode === "note"
            ? "How was Your Day?"
            : "Ready for a Deep Reflection?"}
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <CalendarDate
                type="date"
                onChange={setSelectedDate}
                value={selectedDate}
              />
              {questions.map((question) => (
                <QuestionForm question={question} key={question._id} />
              ))}
              <div className="grid gap-2">
                <button
                  onClick={addQuestion}
                  type="button"
                  className="btn btn-accent w-full"
                >
                  Add More Questions
                </button>
                <button type="submit" className="btn btn-primary w-full">
                  {mode === "note" ? "Save Log" : "Save Introspection"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default JournalForm
