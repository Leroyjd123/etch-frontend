import errorLogo from "../assets/errorLogo.png"
import { Link } from "react-router-dom"

/**
 * Error component to display when a page is not found or an error occurs.
 * It shows a friendly error message and a link to redirect users back to the homepage.
 */

const Error = () => {
  return (
    <div className="flex justify-center items-center my-24">
      <div className="text-center">
        <img
          src={errorLogo}
          alt="Error"
          className="mx-auto w-1/2 md:w-1/4 mb-8"
        />
        <p className="text-2xl mb-5">Oops! Page not found.</p>
        <p className="mb-6">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="btn btn-primary">
          Go to Homepage
        </Link>
      </div>
    </div>
  )
}

export default Error
