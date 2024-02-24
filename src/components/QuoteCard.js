import { useEffect, useState } from "react"
import axios from "../config/axios"

const QuoteCard = () => {
  const [quote, setQuote] = useState({
    quoteText:
      "Patience is not the ability to wait, but the ability to keep a good attitude while waiting. So, if you're reading this, congrats on being more patient than you thought!",
    quoteAuthor: "Anonymous",
    quoteGenre: "humor",
  })

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get("/api/quote")
        // console.log("quotes", response.data)
        setQuote(response.data[0])
      } catch (e) {
        console.log(e)
      }
    }

    fetchQuote()
  }, [])

  return (
    <div>
      <div className="w-96 mx-auto flex  gap-3 justify-center items-center card  bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="justify-center items-center card-title">
            Pause for thought!
          </h2>
          <p className="text-center w-full mb-4"> {quote.quoteText}</p>
          <div className="flex items-center">
            <p className="text-sm italic"> {quote.quoteAuthor}</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline p-3 ">{quote.quoteGenre}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuoteCard
