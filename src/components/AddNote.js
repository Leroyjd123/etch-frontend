import { Link } from "react-router-dom"

const AddNote = () => {
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Are you ready to etch your thoughts down?</h2>
           <div className="card-actions">
            <Link to="/dailynote" className="btn btn-primary">
              Etch Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddNote
