import React from "react"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { useDispatch } from "react-redux"
import InputForm from "../formComponents/InputForm"
import SelectForm from "../formComponents/SelectForm"
import {
  asyncAddQuestion,
  asyncEditQuestion,
} from "../actions/questionsActions"
import CloseIcon from "../assets/CloseIcon"

const QuestionPopup = ({ question, onClose }) => {
  const dispatch = useDispatch()

  const isEditMode = Boolean(question)

  // Set initial form values, converting arrays to comma-separated strings if in edit mode
  const initialValues = isEditMode
    ? {
        ...question,
        options: question.options?.join(", ") || "",
        tags: question.tags?.join(", ") || "",
      }
    : {
        order: "",
        name: "",
        label: "",
        inputType: "",
        options: "",
        tags: "",
      }

  // Validation schema for the form fields
  const validationSchema = Yup.object({
    order: Yup.number().required("Question order is required"),
    name: Yup.string().required("Question name is required"),
    label: Yup.string().required("Question label is required"),
    inputType: Yup.string().required("Input type is required"),
    options: Yup.string().test(
      "unique-options",
      "Options contain duplicates",
      (value = "") =>
        new Set(value.split(",").map((option) => option.trim())).size ===
        value.split(",").length
    ),
    tags: Yup.string().test(
      "unique-tags",
      "Tags contain duplicates",
      (value = "") =>
        new Set(value.split(",").map((tag) => tag.trim())).size ===
        value.split(",").length
    ),
  })

  const submitForm = async (values) => {
    // Formatting values for API
    const formattedValues = {
      ...values,
      options: values.options.split(",").map((option) => option.trim()),
      tags: values.tags.split(",").map((tag) => tag.trim()),
    }

    // Dispatching the appropriate action based on the mode
    if (isEditMode) {
      dispatch(asyncEditQuestion(formattedValues))
    } else {
      dispatch(asyncAddQuestion(formattedValues))
    }

    onClose() // Close the popup on successful submission
  }

  return (
    <dialog id="QuestionModal" className="modal">
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          <CloseIcon height={10} width={10} />
        </button>

        <h1 className="text-lg font-semibold">
          {isEditMode ? "Edit Question" : "Add Question"}
        </h1>
        <div className="w-full max-w-xs md:w-1/2 md:max-w-md">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitForm}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <InputForm name="order" label="Order" type="number" />
                <InputForm name="name" label="Name" type="text" />
                <InputForm name="label" label="Label" type="text" />
                <SelectForm
                  name="inputType"
                  label="Input Type"
                  options={[
                    { label: "Radio", value: "radio" },
                    { label: "Checkbox", value: "checkbox" },
                    { label: "Textarea", value: "textarea" },
                  ]}
                />
                <InputForm name="options" label="Options" type="text" />
                <InputForm name="tags" label="Tags" type="text" />
                <button
                  type="submit"
                  className="btn w-full"
                  disabled={isSubmitting}
                >
                  {isEditMode ? "Save Changes" : "Add Question"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </dialog>
  )
}

export default QuestionPopup
