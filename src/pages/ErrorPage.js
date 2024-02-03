const Error = () => {
  return (
    <div className="h-screen flex items-center justify-center text-center">
      <div>
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-5">Oops! Page not found.</p>
        <p className="mb-6">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <a href="/" className="btn">
          Go to Homepage
        </a>
      </div>
    </div>
  )
}

export default Error
