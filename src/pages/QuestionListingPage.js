import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"

import QuestionPopup from "../components/QuestionPopup"
import QuestionRow from "./QuestionRow"

const QuestionListingPage = () => {
  const dispatch = useDispatch()
  const questions = useSelector((state) => state.questions)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEdit = (question) => {
    setSelectedQuestion(question)
    setIsModalOpen(true)
  }

  const addQuestion = () => {
    setSelectedQuestion(null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <button className="btn" onClick={addQuestion}>
        Add Question
      </button>

      {isModalOpen && (
        <dialog id="questionModal" className="modal" open>
          <div className="modal-box">
            <QuestionPopup question={selectedQuestion} onClose={closeModal} />
          </div>
        </dialog>
      )}

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Order</th>
            <th>Name</th>
            <th>Question</th>
            <th>Input Type</th>
            <th>Options</th>
            <th>Tags</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, i) => (
            <QuestionRow
              key={question._id}
              question={question}
              i={i}
              onEdit={handleEdit}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default QuestionListingPage
