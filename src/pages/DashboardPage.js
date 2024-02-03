import { useEffect } from "react"
import AddNote from "../components/AddNote"
import Navbar from "../components/NavBar"
import { asyncSetUser } from "../actions/userActions"
import { asyncSetQuestions } from "../actions/questionsActions"
import { useDispatch } from "react-redux"

const DashboardPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(asyncSetUser())
    dispatch(asyncSetQuestions())
    console.log("refreshed")
  },[])

  return (
    <div>
      <Navbar />
      <div className="m-5 flex flex-col md:flex-row justify-center items-center">
        <AddNote />
      </div>
    </div>
  )
}

export default DashboardPage
