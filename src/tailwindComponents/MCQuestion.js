import { Field, ErrorMessage } from "formik"

const MCQuestion = ({ question, i }) => {
  return (
    <>
      <div id={question.name} className="block font-medium  mb-2">
        {question.label}
      </div>
      <div
        role="group"
        aria-labelledby={question.name}
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2`}
      >
        {question.options.map((option, idx) => (
          <label key={idx} className="flex items-center">
            <Field
              type={question.inputType}
              name={question.name}
              value={option}
              className={`${question.inputType} mr-2`}
            />
            {option}
          </label>
        ))}
      </div>
      <ErrorMessage
        name={question.name}
        component="div"
        className="mt-2 text-s text-red-400"
      />
    </>
  )
}

export default MCQuestion
