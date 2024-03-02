import { Formik, Form } from "formik"
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import * as Yup from "yup"
import { useSelector, useDispatch } from "react-redux"
import { asyncUpdateUser } from "../actions/userActions"
import InputForm from "../formComponents/InputForm"
import AlertBox from "../formComponents/AlertBox"

const UserProfilePage = () => {
  const [status, setStatus] = useState(null)

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const [avatarID, setAvatarID] = useState(user.avatarID || uuidv4())
  const [avatarURL, setAvatarURL] = useState(``)

  // Update avatar URL whenever avatarID changes
  useEffect(() => {
    setAvatarURL(`https://api.multiavatar.com/${avatarID}.svg`)
  }, [avatarID])

  const initialValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    emailAddress: user?.emailAddress || "",
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    emailAddress: Yup.string()
      .email("Invalid email address")
      .required("Required"),
  })

  const handleAvatarChange = () => {
    const newAvatarID = uuidv4()
    setAvatarID(newAvatarID)
  }

  const submitForm = async (values) => {
    try {
      await dispatch(asyncUpdateUser({ ...values, avatarID }))
      setStatus("success")
    } catch (error) {
      console.error("Error in updating user", error)
      setStatus("error")
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      <h1 className="text-lg font-semibold">User Profile</h1>

      <div className="flex-grow p-5 overflow-auto">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={avatarURL}
            alt="User Avatar"
            className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
          />
          <button
            className="btn btn-primary btn-sm"
            onClick={handleAvatarChange}
          >
            Change Avatar
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitForm}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <InputForm name="firstName" label="First Name" type="text" />
              <InputForm name="lastName" label="Last Name" type="text" />
              <InputForm
                name="emailAddress"
                label="Email Address"
                type="email"
                disabled
              />

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
      {status && (
        <AlertBox
          type={status}
          message={
            status == "success"
              ? "Success! User details updated successfully!"
              : "Error! User details was not updated"
          }
        />
      )}
    </div>
  )
}

export default UserProfilePage
