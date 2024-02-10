import { Field, ErrorMessage } from "formik"

const InputForm = ({ name, label, type, disabled}) => {
  return (
    <div>
      <label htmlFor={name} className="block font-medium mb-2">
        {label}
      </label>
      <Field
        type={type}
        name={name}
        className="input input-bordered w-full"
        disabled={disabled}
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
