import { useEffect } from "react"
import { useDispatch } from "react-redux"

import { asyncSetUser } from "../actions/userActions"
import { asyncSetQuestions } from "../actions/questionsActions"
import AddNote from "../appComponents/AddNote"
import QuoteCard from "../appComponents/QuoteCard"

/**
 * DashboardPage component serves as the landing page for authenticated users displaying quick links for adding notes and reflecting, alongside inspirational quotes.
 */
const DashboardPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // Fetches user and questions data on component mount
    dispatch(asyncSetUser())
    dispatch(asyncSetQuestions())
  }, [dispatch])

  return (
    <div>
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <QuoteCard />

      <div className="m-5 flex flex-col md:flex-row justify-center items-center gap-3">
        {/* <AddNote
          header="Got a Quick Thought?"
          link="/quicknote"
          buttonText="Add Note"
          description="Capture fleeting ideas, to-dos, or any spark of inspiration in a moment. Perfect for when you're on the go."
        /> */}

        <AddNote
          header="How was Your Day?"
          link="/dailynote"
          buttonText="Add Log"
          description="Summarize your daily activities, routines, and accomplishments. A simple way to keep track of your day-to-day progress."
        />

        <AddNote
          header="Ready for a Deep Reflection?"
          link="/dailyintrospection"
          buttonText="Start Reflecting"
          description="Dive deep into your thoughts and experiences. Reflect on your day with guided questions to gain insights and grow."
        />
      </div>
    </div>
  )
}

export default DashboardPage
