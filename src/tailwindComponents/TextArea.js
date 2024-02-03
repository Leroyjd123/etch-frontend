import { Field, ErrorMessage } from "formik"

const TextArea = ({ question, i }) => {
  return (
    <>
      <label htmlFor={question.name} className="block font-medium mb-2">
        {question.label}
      </label>
      <Field
        as="textarea"
        name={question.name}
        className="textarea textarea-bordered w-full"
      />
      <ErrorMessage
        name={question.name}
        component="div"
        className="mt-2 text-s text-red-400"
      />
    </>
  )
}

export default TextArea
