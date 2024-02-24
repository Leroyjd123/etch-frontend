import { useEffect } from "react"
import AddNote from "../components/AddNote"
import Navbar from "../components/NavBar"
import { asyncSetUser } from "../actions/userActions"
import { asyncSetQuestions } from "../actions/questionsActions"
import { useDispatch } from "react-redux"
import QuoteCard from "../components/QuoteCard"

const DashboardPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(asyncSetUser())
    dispatch(asyncSetQuestions())
    console.log("refreshed")
  }, [])

  return (
    <div>
      <Navbar />
      <>
        <QuoteCard />

        <div className="m-5 flex flex-col md:flex-row justify-center items-center gap-3 ">
          <AddNote
            header="Got a Quick Thought?"
            link="/quicknote"
            buttonText="Add Note"
            description="Capture fleeting ideas, to-dos, or any spark of inspiration in a moment. Perfect for when you're on the go."
          />

          <AddNote
            header="How was Your Day?"
            link="/dailynote"
            buttonText="Add Log"
            description="Summarize your daily activities, routines, and accomplishments. A simple way to keep track of your day-to-day progress."
          />

          <AddNote
            header="Ready for Deep Reflection?"
            link="/dailyintrospection"
            buttonText="Start Reflecting"
            description="Dive deep into your thoughts and experiences. Reflect on your day with guided questions to gain insights and grow."
          />
        </div>
      </>
    </div>
  )
}

export default DashboardPage
