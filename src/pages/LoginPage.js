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
 * LoginPage component handles user login and registration functionality.
 */
const LoginPage = () => {
  const [loginStatus, setLoginStatus] = useState(null)
  const [alertStatus, setAlertStatus] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Validation schema for both login and registration
  const validationSchema = Yup.object().shape({
    emailAddress: Yup.string()
      .email("Invalid email address")
      .required("Email address is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  })

  // Handles form submission (either login or registration)
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let response
      if (loginStatus === "register") {
        response = await axios.post(`/api/user/register`, values)
      } else {
        response = await axios.post(`/api/user/login`, values)
      }

      localStorage.setItem("token", response.data.token)
      dispatch(asyncSetUser())
      dispatch(asyncSetQuestions())
      navigate("/dashboard")
      setAlertStatus("success")
    } catch (error) {
      console.error("Error:", error)
      setAlertStatus("error")
    }
    setSubmitting(false)
  }

  return (
    <>
      <div className="m-5 flex flex-col md:flex-row justify-center items-center md:h-screen  my-24">
        <div className="flex flex-col items-center w-full max-w-xs md:w-1/2 md:max-w-md md:mr-8 mb-8 ">
          <div className="p-2 bg-primary rounded-2xl">
            <img src={logo} alt="Logo" className="mx-auto w-24 mb-4 " />
          </div>
          <h1 className="text-4xl mb-2">Etch Journal</h1>

          <p>A simple journal to etch down your thoughts</p>
        </div>

        <div className="w-full max-w-xs md:w-1/2 md:max-w-md">
          <Formik
            initialValues={{ emailAddress: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
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
                  onClick={() => setLoginStatus("login")}
                >
                  Login
                </button>
                <button
                  type="submit"
                  className="btn btn-accent w-full"
                  disabled={isSubmitting}
                  onClick={() => setLoginStatus("register")}
                >
                  Register
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {loginStatus && (
        <AlertBox
          type={alertStatus}
          message={`${
            loginStatus === "register" ? "Registration" : "Login"
          } ${alertStatus}!`}
        />
      )}
    </>
  )
}

export default LoginPage
