import { Formik, Form } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useState } from "react"

import axios from "../config/axios"
import { asyncSetUser } from "../actions/userActions"
import { asyncSetQuestions } from "../actions/questionsActions"
import InputForm from "../formComponents/InputForm"
import AlertBox from "../formComponents/AlertBox"
import logo from "../assets/logo.png"

/**
 * LoginPage component handles user login functionality.
 */
const LoginPage = () => {
  const [loginStatus, setLoginStatus] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Validation schema for the login form
  const validationSchema = Yup.object().shape({
    emailAddress: Yup.string()
      .email("Invalid email address")
      .required("Email address is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  })

  // Handles form submission
  const submitForm = async (values) => {
    try {
      const response = await axios.post(`/api/user/login`, values)
      localStorage.setItem("token", response.data.token)
      dispatch(asyncSetUser())
      dispatch(asyncSetQuestions())
      navigate("/dashboard")
      setLoginStatus("success")
    } catch (error) {
      console.error("Error logging in:", error)
      setLoginStatus("error")
    }
  }

  return (
    <>
      <div className="m-5 flex flex-col md:flex-row justify-center items-center md:h-screen  my-24">
        <div className="flex flex-col items-center w-full max-w-xs md:w-1/2 md:max-w-md md:mr-8 mb-8">
          <img src={logo} alt="Logo" className="mx-auto w-24 mb-4" />
          <h1 className="text-xl mb-2">Etch Journal</h1>
          <p>A simple journal to etch down your thoughts</p>
        </div>

        <div className="w-full max-w-xs md:w-1/2 md:max-w-md">
          <Formik
            initialValues={{ emailAddress: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <InputForm
                  name="emailAddress"
                  label="Email Address"
                  type="text"
                  placeholder="Enter your email address"
                />
                <InputForm
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                />
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isSubmitting}
                >
                  Login
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {loginStatus && (
        <AlertBox type={loginStatus} message={`Login ${loginStatus}!`} />
      )}
    </>
  )
}

export default LoginPage
