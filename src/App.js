// Importing necessary React hooks and utilities
import { useState, useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"

// Importing component and page components
import LoginPage from "./pages/LoginPage"
import ThemeToggle from "./formComponents/ThemeToggle"
import DashboardPage from "./pages/DashboardPage"
import NotFoundPage from "./pages/ErrorPage"
import moment from "moment" // Importing moment for date formatting
import UserProfilePage from "./pages/UserProfilePage"
import QuestionListingPage from "./pages/QuestionListingPage"
import AnswerListingPage from "./pages/AnswerListingPage"
import MetricsPage from "./pages/MetricsPage"

import PaymentPage from "./pages/PaymentPage"
import JournalForm from "./appComponents/JournalForm"
import Navbar from "./appComponents/NavBar"

function App() {
  // State for managing current time, updated every second
  const [currentTime, setCurrentTime] = useState(
    moment().format("MMMM Do YYYY, h:mm:ss a")
  )
  const location = useLocation()

  // Effect hook to update the current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment().format("MMMM Do YYYY, h:mm:ss a"))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Determine whether to show the NavBar based on the current route
  const showNavBar = location.pathname !== "/"

  return (
    <div className="p-4">
      {showNavBar && <Navbar />}
      <div className={`absolute top-2 left-4 ${!showNavBar ? "hidden" : ""}`}>
        {currentTime}
      </div>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/dailynote"
          element={
            <JournalForm
              mode="note"
              tagFilter="daily review"
              randomizeQuestions={false}
            />
          }
        />
        <Route
          path="/dailyintrospection"
          element={
            <JournalForm
              mode="introspection"
              tagFilter="introspection"
              randomizeQuestions={true}
            />
          }
        />
        <Route path="/userprofile" element={<UserProfilePage />} />
        <Route path="/questionlisting" element={<QuestionListingPage />} />
        <Route path="/answerlisting" element={<AnswerListingPage />} />
        <Route path="/metrics" element={<MetricsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
