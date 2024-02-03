import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import MCQuestion from "../tailwindComponents/MCQuestion"
import { useSelector, useDispatch } from "react-redux"

const DailyNote = () => {
  const dispatch = useDispatch()
  const questions = Object.values(useSelector((state) => state.questions))

  const initialValues = questions.reduce((values, question) => {
    values[question.name] = question.inputType === "checkbox" ? [] : ""
    return values
  }, {})

  const validationSchema = Yup.object().shape(
    questions.reduce((schema, question) => {
      schema[question.name] = question.validation
      return schema
    }, {})
  )

  return (
    <div className=" flex flex-col md:flex-row">
      <div className="flex-grow p-5 overflow-auto">
        <p className="text-lg font-semibold">etch down your daily thoughts</p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values)
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {questions.map((question, i) => (
                <MCQuestion question={question} key={i} />
              ))}
              <div className="grid grid-cols-2 gap-2">
                <button type="submit" className="btn w-full">
                  Save & Close
                </button>
                <button type="submit" className="btn w-full">
                  Save & Continue
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
