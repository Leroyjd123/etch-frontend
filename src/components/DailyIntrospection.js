import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"
import QuestionForm from "../tailwindComponents/QuestionForm"
import { asyncAddAnswers } from "../actions/answersActions"
import CalendarDate from "../tailwindComponents/CalendarDate"

const DailyIntrospection = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedDate, setSelectedDate] = useState(Date())

  const questionList = useSelector((state) => state.questions).filter(
    (question) => !question.tags.includes("daily review")
  )

  const [questions, setQuestions] = useState(
    questionList.sort(() => 0.5 - Math.random()).slice(0, 3)
  )

  const user = useSelector((state) => state.user)

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
    if (user.userType == "subscribedUser") {
      console.log(user.userType)
      const newQuestion = questionList
        .filter((question) => !questions.includes(question))
        .sort(() => 0.5 - Math.random())[1]

      setQuestions([...questions, newQuestion])
    } else {
      alert("please purchase")
    }
  }

  const handleSubmit = async (values) => {
    // console.log(values)
    // const formedValues = {
    //   date: new Date(selectedDate),
    //   entryList: Object.keys(values).map((key) => ({
    //     questionID: key,
    //     entries: values[key],
    //   })),
    // }
    // console.log("Map", formedValues)

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
              entries: value.trim(),
            },
          ]
        } else {
          return []
        }
      }),
    }
    //console.log("FlatMap", formValues)

    if (formValues.entryList.length === 0) {
      alert("Please answer atleast one question!")
    } else {
      console.log("working")
      dispatch(asyncAddAnswers(formValues))
    }
    // navigate("/dashboard")
  }

  return (
    <div className=" flex flex-col md:flex-row">
      <div className="flex-grow p-5 overflow-auto">
        <p className="text-lg font-semibold">etch down your daily thoughts</p>

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

              <div className="grid ">
                <button type="submit" className="btn w-full">
                  Save Introspection
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default DailyIntrospection
