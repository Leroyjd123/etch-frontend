import { Field, ErrorMessage } from "formik"

const QuestionForm = ({ question }) => {
  const InputComponent =
    question.inputType === "textarea" ? "textarea" : "input"
  //console.log("questions", question)

  return (
    <>
      <div id={question._id} className="block font-medium  mb-2">
        {question.label}
      </div>

      {question.inputType !== "textarea" ? (
        <div
          role="group"
          aria-labelledby={question._id}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2`}
        >
          {question.options.map((option, idx) => (
            <label key={idx} className="flex items-center">
              <Field
                type={question.inputType}
                name={question._id}
                value={option}
                className={`${question.inputType} mr-2`}
              />
              {option}
            </label>
          ))}
        </div>
      ) : (
        <Field
          as="textarea"
          name={question._id}
          className="textarea textarea-bordered w-full"
        />
      )}
      <ErrorMessage
        name={question._id}
        component="div"
        className="mt-2 text-s text-red-400"
      />
    </>
  )
}

export default QuestionForm
