import { Link } from "react-router-dom"

const AddNote = ({ header, link, buttonText}) => {
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{header}</h2>
          <div className="card-actions">
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
