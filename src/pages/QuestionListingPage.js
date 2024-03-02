import { useSelector } from "react-redux"
import { useState } from "react"

import QuestionPopup from "../appComponents/QuestionPopup"
import QuestionRow from "./QuestionRow"

const QuestionListingPage = () => {
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
    const modal = document.getElementById("QuestionModal")

    modal.showModal()
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <h1 className="text-lg font-semibold">Question Listing</h1>
      <button
        className="btn btn-primary hidden md:inline-block"
        onClick={addQuestion}
      >
        Add Question
      </button>

      {isModalOpen && (
        <QuestionPopup question={selectedQuestion} onClose={closeModal} />
      )}

      <div className="hidden md:block">
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
            {questions.map((question, index) => (
              <QuestionRow
                key={question._id}
                question={question}
                index={index}
                onEdit={handleEdit}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden">
        {questions.map((question, index) => (
          <div key={question._id} className="collapse collapse-plus mb-2">
            <input type="checkbox" className="peer" />
            <div className="collapse-title bg-accent">
              {++index}. {question.name}
            </div>
            <div className=" collapse-content bg-accent gap-2">
              <p className="text-sm mb-2">{question.label}</p>
              <div className="flex flex-wrap gap-2">
                {question.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="badge badge-outline">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default QuestionListingPage
