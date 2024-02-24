import { Formik, Form  } from "formik"
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
 
  const [selectedDate, setSelectedDate] = useState(Date())
  const questions = useSelector((state) => state.questions)
    .filter((question) => question.tags.includes("daily review"))
    .sort((a, b) => a.order - b.order)

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
              entries: [value.trim()],
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
      //console.log("working")
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
