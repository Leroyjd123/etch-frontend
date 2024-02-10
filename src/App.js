import { useState, useEffect } from "react"
import { Routes, Route, Link } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import ThemeToggle from "./components/ThemeToggle"
import DashboardPage from "./pages/DashboardPage"
import NotFoundPage from "./pages/ErrorPage"
import DailyNote from "./components/DailyNote"
import DailyIntrospection from "./components/DailyIntrospection"
import moment from "moment"
import UserProfilePage from "./pages/UserProfilePage"
import QuestionListingPage from "./pages/QuestionListingPage"
import AnswerListingPage from "./pages/AnswerListingPage"


function App() {
  const [currentTime, setCurrentTime] = useState(
    moment().format("MMMM Do YYYY, h:mm:ss a")
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment().format("MMMM Do YYYY, h:mm:ss a"))
    }, 1000)

    return () => clearInterval(timer) // Clear interval on component unmount
  }, [])

  return (
    <div className="p-4">
      <div className="absolute top-2 left-4">{currentTime}</div>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dailynote" element={<DailyNote />} />
        <Route path="/dailyintrospection" element={<DailyIntrospection />} />
        <Route path="/userprofile" element={<UserProfilePage />} />
        <Route path="/questionlisting" element={<QuestionListingPage />} />
        <Route path="/answerlisting" element={<AnswerListingPage />} />

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
