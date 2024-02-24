import { Field, ErrorMessage } from "formik"

const InputForm = ({ name, label, type, disabled, placeholder }) => {
  return (
    <div>
      <label htmlFor={name} className="block mb-2">
        {label}
      </label>
      <Field
        type={type}
        name={name}
        className="input input-bordered w-full input-primary"
        disabled={disabled}
        placeholder={placeholder}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="mt-2 text-s text-red-400"
      />
    </div>
  )
}

export default InputForm
