import { Field, ErrorMessage } from "formik"

const SelectForm = ({ name, label, options, disabled }) => {
  return (
    <div>
      <label htmlFor={name} className="block font-medium mb-2">
        {label}
      </label>
      <Field
        as="select"
        name={name}
        className="select select-bordered w-full max-w-xs"
        disabled={disabled}
      >
        <option disabled value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      <ErrorMessage
        name={name}
        component="div"
        className="mt-2 text-s text-red-400"
      />
    </div>
  )
}

export default SelectForm
