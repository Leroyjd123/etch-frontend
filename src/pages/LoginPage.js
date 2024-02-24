import { Formik, Form, Field, ErrorMessage } from "formik"
import logo from "../assets/logo.png"

import axios from "../config/axios"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { asyncSetUser } from "../actions/userActions"
import InputForm from "../tailwindComponents/InputForm"
import { asyncSetQuestions } from "../actions/questionsActions"
import { useState } from "react"
import AlertBox from "../tailwindComponents/AlertBox"

const LoginPage = () => {
  const [loginStatus, setLoginStatus] = useState(null)
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
      setLoginStatus("success")

      localStorage.setItem("token", response.data.token)

      navigate("/dashboard")
      dispatch(asyncSetUser())
      dispatch(asyncSetQuestions())
    } catch (e) {
      setLoginStatus("error")
      console.log("error", e)
    }
  }

  return (
    <>
      <div className="m-5 flex flex-col md:flex-row justify-center items-center h-screen">
        <div className="flex flex-col items-center w-full max-w-xs md:w-1/2 md:max-w-md md:mr-8 mb-8">
          <div className="flex justify-center w-full">
            <img src={logo} alt="Logo" className="mx-auto w-24 mb-4" />
          </div>
          <h1 className="text-xl mb-2">Etch Journal</h1>
          <p className="text-center">
            A simple journal to etch down your thoughts
          </p>
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
                  placeholder="Enter your email address"
                />
                <InputForm
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                />

                <button type="submit" className="btn btn-primary w-full ">
                  Login
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {loginStatus === "success" && (
        <AlertBox type="success" message="You have successfully logged in!" />
      )}
      {loginStatus === "error" && (
        <AlertBox type="error" message="Error! Login failed!" />
      )}
    </>
  )
}

export default LoginPage
