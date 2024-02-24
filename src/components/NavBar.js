import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { clearUser } from "../actions/userActions"
import { clearAnswers } from "../actions/answersActions"
import { clearQuestions } from "../actions/questionsActions"
import logo from "../assets/logo.png"

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    localStorage.clear()
    dispatch(clearUser())
    dispatch(clearAnswers())
    dispatch(clearQuestions())

    navigate("/")
  }

  const navLinks = [
    { name: "Answers Listing", path: "/answerlisting" },
    { name: "Metrics", path: "/metrics" },
    { name: "Settings", path: "/userprofile" },
    { name: "Question Listing", path: "/questionlisting" },
  ]

  const renderNavLinks = () =>
    navLinks.map((link, index) => (
      <li key={index}>
        <Link to={link.path} onClick={() => setIsOpen(false)}>
          {link.name}
        </Link>
      </li>
    ))

  return (
    <>
      <div className="navbar bg-base-100 rounded-box mx-auto m-4">
        <div className="flex-1">
          <Link to="/dashboard" className="btn btn-ghost">
            <img src={logo} alt="Logo" className="h-4 w-4" />
            Etch
          </Link>
        </div>
        <div className="flex-none md:hidden">
          <button
            className="btn btn-square btn-ghost"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className={`flex-none hidden md:block`}>
          <ul className="menu menu-horizontal p-0">
            {renderNavLinks()}
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>

      {isOpen && (
        <div className="menu drop-shadow-2xl bg-base-100 rounded-box fixed top-0 right-0 w-64 h-full z-40 transform transition duration-1000 ease-in-out">
          <button
            className="btn btn-square btn-ghost absolute top-0 left-0"
            onClick={() => setIsOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <ul className="menu mt-5 p-5">
            {renderNavLinks()}
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default Navbar
