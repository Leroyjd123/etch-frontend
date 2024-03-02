import { useDispatch } from "react-redux"
import { asyncDeleteQuestion } from "../actions/questionsActions"
import EditIcon from "../assets/EditIcon"
import DeleteIcon from "../assets/DeleteIcon"

const QuestionRow = ({ question, index }) => {
  const dispatch = useDispatch()

  const handleEdit = () => {
    const modal = document.getElementById("QuestionModal")
    if (modal) {
      modal.showModal()
    }
  }

  const handleDelete = () => {
    const confirmation = window.confirm("Are you sure?")
    if (confirmation) {
      dispatch(asyncDeleteQuestion(question._id))
    }
  }

  return (
    <tr className="hover">
      <td>{index + 1}</td>
      <td>{question.order}</td>
      <td>{question.name}</td>
      <td>{question.label}</td>
      <td>{question.inputType}</td>
      <td>{question.options.join(", ")}</td>
      <td>{question.tags.join(", ")}</td>
      <td>
        <div className="flex gap-1">
          <button onClick={handleEdit} className="btn btn-secondary btn-square">
            <EditIcon height={4} width={4} />
          </button>

          <button className="btn btn-error btn-square" onClick={handleDelete}>
            <DeleteIcon height={4} width={4} />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default QuestionRow
