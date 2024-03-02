import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { clearUser } from "../actions/userActions"
import { clearAnswers } from "../actions/answersActions"
import { clearQuestions } from "../actions/questionsActions"
import logo from "../assets/logo.png"
import MenuIcon from "../assets/MenuIcon"
import CloseIcon from "../assets/CloseIcon"

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
    { name: "Home", path: "/dashboard" },
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
      <div className="navbar bg-accent text-primary-content rounded-box mx-auto m-4 ">
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
            <MenuIcon height={4} width={4} />
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
        <div className="menu drop-shadow-2xl bg-accent  text-primary-content rounded-l-box fixed top-0 right-0 w-64 h-full z-40 transform transition duration-1000 ease-in-out">
          <button
            className="btn btn-square btn-ghost absolute top-0 left-0"
            onClick={() => setIsOpen(false)}
          >
            <CloseIcon height={4} width={4} />
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
