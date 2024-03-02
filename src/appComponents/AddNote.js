import { Link } from "react-router-dom"

/**
 * Displays a card component encouraging users to perform an action, such as adding a note.
 */

const AddNote = ({ header, link, buttonText, description }) => {
  return (
    <div className="flex justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center gap-2">
          <h2 className="card-title">{header}</h2>
          <p className="italic mb-2">{description}</p>
          <div className="card-actions justify-center">
            <Link to={link} className="btn btn-primary">
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddNote
