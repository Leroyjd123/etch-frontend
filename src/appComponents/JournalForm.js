import { Formik, Form } from "formik"
import * as Yup from "yup"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import QuestionForm from "../formComponents/QuestionForm"
import { asyncAddAnswers } from "../actions/answersActions"
import CalendarDate from "../formComponents/CalendarDate"
import AlertBox from "../formComponents/AlertBox"

/**
 * A component for creating and submitting journal entries, with questions that can be either fixed or randomized, based on the provided mode and tags.
 */

const JournalForm = ({ mode, tagFilter, randomizeQuestions }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  )

  const user = useSelector((state) => state.user)
  const questionList = useSelector((state) => state.questions)
  const [questions, setQuestions] = useState([])

  const [loginStatus, setLoginStatus] = useState(null)

  // Filter or randomize questions based on component props
  useEffect(() => {
    let filteredQuestions = questionList.filter((question) =>
      question.tags.includes(tagFilter)
    )

    if (randomizeQuestions) {
      filteredQuestions = [...filteredQuestions].sort(() => 0.5 - Math.random())
    }

    setQuestions(filteredQuestions.slice(0, 3))
  }, [questionList, tagFilter, randomizeQuestions])

  // Setup initial form values
  const initialValues = questions.reduce((values, question) => {
    values[question._id] = question.inputType === "checkbox" ? [] : ""
    return values
  }, {})

  // Define validation schema dynamically based on questions
  const validationSchema = Yup.object(
    questions.reduce((schema, question) => {
      if (question.validation) {
        schema[question._id] = question.validation
      }
      return schema
    }, {})
  )

  // Handle adding more questions
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

  // Submit form data
  const handleSubmit = async (values) => {
    const formValues = {
      date: new Date(selectedDate),
      entryList: Object.entries(values).flatMap(([key, value]) => {
        if (Array.isArray(value) && value.some((val) => val.trim() !== "")) {
          return {
            questionId: key,
            entries: value.filter((val) => val.trim() !== ""),
          }
        } else if (typeof value === "string" && value.trim() !== "") {
          return { questionId: key, entries: [value.trim()] }
        }
        return []
      }),
    }

    if (formValues.entryList.length > 0) {
      await dispatch(asyncAddAnswers(formValues))
      // alert(
      //   mode === "note"
      //     ? "Your daily log has been saved!"
      //     : "Your daily introspection has been saved!"
      // )
      setLoginStatus("success")
      navigate("/dashboard")
    } else {
      setLoginStatus("error")
      // alert("Please answer at least one question!")
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
                onChange={(date) => setSelectedDate(date)}
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
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {mode === "note" ? "Save Log" : "Save Introspection"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {loginStatus === "success" && (
        <AlertBox
          type="success"
          message={
            mode === "note"
              ? "Your daily log has been saved!"
              : "Your daily introspection has been saved!"
          }
        />
      )}
      {loginStatus === "error" && (
        <AlertBox
          type="error"
          message="Error! Please answer at least one question!"
        />
      )}
    </div>
  )
}

export default JournalForm
