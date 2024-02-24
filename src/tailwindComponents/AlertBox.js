import { useState, useEffect } from "react"

const AlertBox = ({ type, message }) => {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    setIsVisible(true)

    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const alertTypes = {
    success: {
      className: "alert alert-success",
      iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      defaultMsg: "This action has been successful!",
    },
    error: {
      className: "alert alert-error",
      iconPath:
        "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
      defaultMsg: "This action has failed!",
    },
    warning: {
      className: "alert alert-warning",
      iconPath:
        "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
      defaultMsg: "This is warning!",
    },
    info: {
      className: "alert alert-info",
      iconPath:
        "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
      defaultMsg: "This is for your information!",
    },
  }

  const alert = alertTypes[type]

  return isVisible ? (
    <div
      role="alert"
      className={`${
        alert.className
      } transition-opacity duration-1000 ease-in-out fixed bottom-0 left-0 right-0 p-4 mx-4 my-4 flex w-auto ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={alert.iconPath}
        />
      </svg>
      <span>{message || alert.defaultMsg}</span>
    </div>
  ) : null
}

export default AlertBox
