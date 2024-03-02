import { Field } from "formik"
import ErrorForm from "./ErrorForm"

/**
 * Renders a select input field within a form using Formik for state management.
 */

const SelectForm = ({ name, label, options, disabled = false }) => {
  return (
    <div>
      <label htmlFor={name} className="block mb-2">
        {label}
      </label>
      <Field
        as="select"
        name={name}
        className="select select-bordered w-full max-w-xs"
        disabled={disabled}
      >
        <option disabled value="">
          Select an option
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>

      <ErrorForm name={name} />
    </div>
  )
}

export default SelectForm
