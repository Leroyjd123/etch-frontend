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
      <QuoteCard className="m-5 flex flex-col md:flex-row justify-center items-center gap-3"/>

      <div className="m-5 flex flex-col md:flex-row justify-center items-center gap-3">
        <AddNote
          header="Ready to note down your day?"
          link="/dailynote"
          buttonText="Note Down Now!"
        />

        <AddNote
          header="Ready to introspect?"
          link="/dailyintrospection"
          buttonText="Introspect Now!"
        />
      </div>
    </div>
  )
}

export default DashboardPage
