import { Formik, Form, Field, ErrorMessage } from "formik"

import axios from "../config/axios"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { asyncSetUser } from "../actions/userActions"
import InputForm from "../tailwindComponents/InputForm"
import { asyncSetQuestions } from "../actions/questionsActions"

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    emailAddress: Yup.string()
      .email("Invalid email address")
      .required("Email address is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  })

  const submitForm = async (values) => {
    try {
      const response = await axios.post(`/api/user/login`, values)

      localStorage.setItem("token", response.data.token)
      navigate("/dashboard")
      dispatch(asyncSetUser())
      dispatch(asyncSetQuestions())
    } catch (e) {
      console.log("error", e)
    }
  }

  return (
    <div className="m-5 flex flex-col md:flex-row justify-center items-center h-screen">
      <div className="w-full max-w-xs md:w-1/2 md:max-w-md md:mr-8">
        <h1 className="text-xl mb-2">etch</h1>
        <p>etch down your daily thoughts</p>
      </div>

      <div className="w-full max-w-xs md:w-1/2 md:max-w-md">
        <Formik
          initialValues={{ emailAddress: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => submitForm(values)}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <InputForm
                name="emailAddress"
                label="Email Address"
                type="text"
              />
              <InputForm name="password" label="Password" type="password" />

              <button type="submit" className="btn w-full">
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default LoginPage
