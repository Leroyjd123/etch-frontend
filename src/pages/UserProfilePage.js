import { Formik, Form } from "formik"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import * as Yup from "yup"
import { useSelector, useDispatch } from "react-redux"
import { asyncUpdateUser } from "../actions/userActions"
import InputForm from "../tailwindComponents/InputForm"

const UserProfilePage = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  //console.log("user", user)
  const [avatarID, setAvatarID] = useState(user.avatarID ?? uuidv4())
  const [avatarURL, setAvatarURL] = useState(
    `https://api.multiavatar.com/${avatarID}.svg`
  )

  const initialValues = {
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    emailAddress: user?.emailAddress ?? "",
  }

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    emailAddress: Yup.string()
      .email("Invalid email address")
      .required("Required"),
  })

  const handleAvatarChange = () => {
    const newAvatarID = uuidv4()
    setAvatarID(newAvatarID)
    setAvatarURL(`https://api.multiavatar.com/${newAvatarID}.svg`)
  }

  const submitForm = async (values) => {
    const userData = values
    userData.avatarID = avatarID
    try {
      const result = await dispatch(asyncUpdateUser(userData))
      console.log("Updated")
    } catch (e) {
      console.log("error in updating user", e)
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-grow p-5 overflow-auto">
        <p className="text-lg font-semibold">User Profile</p>

        <div className="flex items-center space-x-4 mb-4">
          <img
            src={avatarURL}
            alt="User Avatar"
            className="w-24 h-24 rounded-full"
          />
          <button className="btn btn-sm" onClick={handleAvatarChange}>
            Change Avatar
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => submitForm(values)}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <InputForm name="firstName" label="First Name" type="text" />
              <InputForm name="lastName" label="Last Name" type="text" />
              <InputForm
                name="emailAddress"
                label="Email Address"
                type="email"
                disabled={true}
              />

              <button
                type="submit"
                className="btn w-full"
                disabled={isSubmitting}
              >
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default UserProfilePage
