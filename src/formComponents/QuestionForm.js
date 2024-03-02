import { Field } from "formik"
import ErrorForm from "./ErrorForm"

/**
 * Renders a form question, which can be a textarea, a checkbox, or a radio button based on the provided question details.
 */

const QuestionForm = ({ question }) => {
  // Determines the Field component's 'as' prop value based on question input type
  const inputComponent =
    question.inputType === "textarea" ? "textarea" : "input"

  return (
    <div className="pt-4">
      
      <div id={question._id} className="block font-medium mb-2">
        {question.label}
      </div>

      {question.inputType !== "textarea" ? (
        <div
          role="group"
          aria-labelledby={question._id}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
        >
          {question.options &&
            question.options?.map((option, idx) => (
              <label key={idx} className="flex items-center">
                <Field
                  type={question.inputType}
                  name={question._id}
                  value={option}
                  className={`${question.inputType} mr-3`}
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
      <ErrorForm name={question._id} />
    </div>
  )
}

export default QuestionForm
