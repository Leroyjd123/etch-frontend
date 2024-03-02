import { Field } from "formik"
import ErrorForm from "./ErrorForm"

/**
 * InputForm - A reusable input component for forms using Formik.
 */

const InputForm = ({ name, label, type, disabled = false, placeholder }) => {
  return (
    <div>
      <label htmlFor={name} className="block mb-2">
        {label}
      </label>
      <Field
        type={type}
        name={name}
        id={name}
        className="input input-bordered w-full input-primary"
        disabled={disabled}
        placeholder={placeholder}
      />

      <ErrorForm name={name} />
    </div>
  )
}

export default InputForm
