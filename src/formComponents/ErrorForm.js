import { ErrorMessage } from "formik"

/**
 * Renders a Formik field's error message.
 */
const ErrorForm = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      component="div"
      className="mt-2 text-m text-red-500"
    />
  )
}

export default ErrorForm
