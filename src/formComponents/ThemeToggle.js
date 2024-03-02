import { useState, useEffect } from "react"
import SunIcon from "../assets/SunIcon"
import MoonIcon from "../assets/MoonIcon"

function ThemeToggle() {
  // Initialize the dark mode state from localStorage or default to false
  const [isDark, setIsDark] = useState(
    localStorage.getItem("isDark")
      ? JSON.parse(localStorage.getItem("isDark"))
      : false
  )

  const [theme, setTheme] = useState(isDark ? "dark" : "light")

  // Update the theme in localStorage and document's class list on state change
  useEffect(() => {
    setTheme(isDark ? "dark" : "light")
    localStorage.setItem("isDark", JSON.stringify(isDark))
  }, [isDark])

  const handleToggle = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="static m-2">
      <label className=" absolute top-2 right-4 swap swap-rotate mr-2">
        <input
          type="checkbox"
          className="theme-controller"
          onChange={() => handleToggle()}
          value="dark"
        />

        <SunIcon height={6} width={6} />
        <MoonIcon height={6} width={6} />
      </label>
    </div>
  )
}

export default ThemeToggle
