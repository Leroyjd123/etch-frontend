import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import TextArea from "../tailwindComponents/TextArea"

const DailyIntrospection = () => {
  const questions = [
    {
      name: "wakeUpTime",
      label: "What time did you wake up today?",
      inputType: "textarea",
      validation: Yup.string().required("Required"),
    },
    {
      name: "mainEvents",
      label: "What were the three main events of your day?",
      inputType: "textarea",
      validation: Yup.string().required("Required"),
    },
  ]

  const initialValues = questions.reduce((values, question) => {
    values[question.name] = ""
    return values
  }, {})

  const validationSchema = Yup.object().shape(
    questions.reduce((schema, question) => {
      schema[question.name] = question.validation
      return schema
    }, {})
  )

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-grow p-5 overflow-auto">
        <p className="text-lg font-semibold">Etch down your daily thoughts</p>

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
                <TextArea question={question} key={i} />
              ))}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="submit"
                  className="btn w-full"
                  disabled={isSubmitting}
                >
                  Save & Close
                </button>
                <button
                  type="submit"
                  className="btn w-full"
                  disabled={isSubmitting}
                >
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

export default DailyIntrospection
