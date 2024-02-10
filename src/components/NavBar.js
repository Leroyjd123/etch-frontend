import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { clearUser } from "../actions/userActions"
import { clearAnswers } from "../actions/answersActions"
import { clearQuestions } from "../actions/questionsActions"

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.clear()
    dispatch(clearUser)
    dispatch(clearAnswers)
    dispatch(clearQuestions)

    navigate("/")
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/dashboard" className="btn btn-ghost text-xl">
          etch
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/userprofile">Settings</Link>
          </li>
          <li>
            <Link to="/answerlisting">Answers Listing</Link>
          </li>
          <li>
            <Link to="/questionlisting">Question Listing</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
