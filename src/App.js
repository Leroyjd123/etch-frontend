import { useState, useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import ThemeToggle from "./components/ThemeToggle"
import DashboardPage from "./pages/DashboardPage"
import NotFoundPage from "./pages/ErrorPage"
import moment from "moment"
import UserProfilePage from "./pages/UserProfilePage"
import QuestionListingPage from "./pages/QuestionListingPage"
import AnswerListingPage from "./pages/AnswerListingPage"
import MetricsPage from "./pages/MetricsPage"
import Success from "./pages/SuccessPage"
import Cancel from "./pages/CancelPage"
import PaymentPage from "./components/PaymentPage"
import JournalForm from "./components/JournalForm"
import Navbar from "./components/NavBar" // Make sure the path is correct

function App() {
  const [currentTime, setCurrentTime] = useState(
    moment().format("MMMM Do YYYY, h:mm:ss a")
  )
  const location = useLocation() // Hook to get the current location

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment().format("MMMM Do YYYY, h:mm:ss a"))
    }, 1000)

    return () => clearInterval(timer) // Clear interval on component unmount
  }, [])

  // Check if the current path is not the login page
  const showNavBar = location.pathname !== "/"

  return (
    <div className="p-4">
      {/* Conditionally render NavBar based on the route */}
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
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
