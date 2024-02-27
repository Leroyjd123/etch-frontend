import { Link } from "react-router-dom"

const Button = ({ text, onClick, className, type = "button", to }) => {
  // If 'to' prop is provided, render a Link component
  if (to) {
    return (
      <Link to={to} className={`btn ${className}`}>
        {text}
      </Link>
    )
  }

  // Otherwise, render a button element
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
