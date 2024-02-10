import { Formik, Form } from "formik"
import * as Yup from "yup"
import { array, object, string } from "yup"
import InputForm from "../tailwindComponents/InputForm"
import SelectForm from "../tailwindComponents/SelectForm"
import {
  asyncAddQuestion,
  asyncEditQuestion,
} from "../actions/questionsActions"
import { useDispatch } from "react-redux"

const QuestionPopup = ({ question, onClose }) => {
  const dispatch = useDispatch()

  const isEditMode = question != null

  const initialValues = isEditMode
    ? {
        ...question,
        options: question.options?.join(", ") || "",
        tags: question.tags?.join(", ") || "",
      }
    : { order: "", name: "", label: "", inputType: "", options: "", tags: "" }

  const validationSchema = Yup.object().shape({
    order: Yup.number().required("Question order is required"),
    name: Yup.string().required("Question name is required"),
    label: Yup.string().required("Question is required"),
    inputType: Yup.string().required("Input type is required"),
    options: Yup.string().test(
      "unique-options",
      "Options contain duplicates",
      (value = "") => {
        const optionsArray = value.split(",").map((option) => option.trim())
        return new Set(optionsArray).size === optionsArray.length
      }
    ),
    tags: Yup.string().test(
      "unique-tags",
      "Tags contain duplicates",
      (value = "") => {
        const tagsArray = value.split(",").map((tag) => tag.trim())
        return new Set(tagsArray).size === tagsArray.length
      }
    ),
  })

  const hasDuplicates = (commaSeparatedString) => {
    const items = commaSeparatedString.split(",").map((item) => item.trim())
    const uniqueItems = new Set(items)
    return uniqueItems.size !== items.length
  }

  const submitForm = async (values) => {
    try {
      if (hasDuplicates(values.options) || hasDuplicates(values.tags)) {
        console.log("Error: Duplicate values detected")
        return
      }

      const formattedValues = {
        ...values,
        options: values.options.split(",").map((option) => option.trim()),
        tags: values.tags.split(",").map((tag) => tag.trim()),
      }

      if (isEditMode) {
        //console.log("Editing question:", formattedValues)
        dispatch(asyncEditQuestion(formattedValues))
      } else {
        //console.log("Adding new question:", formattedValues)
        dispatch(asyncAddQuestion(formattedValues))
      }
      onClose()
    } catch (e) {
      console.log("error", e)
    }
  }

  return (
    <>
      <button
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        onClick={onClose}
      >
        ✕
      </button>
      <h1>{isEditMode ? "Edit Question" : "Add Question"}</h1>
      <div className="w-full max-w-xs md:w-1/2 md:max-w-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitForm}
          enableReinitialize // This is important when updating initialValues dynamically
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <InputForm name="order" label="order" type="number" />
              <InputForm name="name" label="name" type="text" />
              <InputForm name="label" label="label" type="text" />
              <SelectForm
                name="inputType"
                label="input"
                options={[
                  { label: "Radio", value: "radio" },
                  { label: "Checkbox", value: "checkbox" },
                  { label: "Textarea", value: "textarea" },
                ]}
              />
              <InputForm name="options" label="options" type="text" />
              <InputForm name="tags" label="tags" type="text" />

              <button type="submit" className="btn w-full">
                {isEditMode ? "Save Changes" : "Add Question"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default QuestionPopup
