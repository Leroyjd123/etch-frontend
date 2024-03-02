import { useEffect, useState } from "react"
import axios from "../config/axios"

const QuoteCard = () => {
  const [quote, setQuote] = useState({})

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchQuote = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get("/api/quote")
        setQuote(response.data[0])
      } catch (error) {
        console.error("Failed to fetch quote:", error)
        setQuote({
          quoteText:
            "This code didn't fail. It just found another way to do it wrong!",
          quoteAuthor: "Developer",
          quoteGenre: "humor",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuote()
  }, [])

  return (
    <div className="w-96 mx-auto flex gap-3 justify-center items-center card bg-base-100 shadow-xl">
      <div className="card-body">
        {isLoading ? (
          <>
            <h2 className="card-title mx-auto">Please wait as we load</h2>
            {/* Skeleton loaders for text */}
            <div className="skeleton h-4 w-full mb-4"></div>
            <div className="flex items-center justify-between">
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton"></div>
            </div>
          </>
        ) : (
          <>
            <h2 className="card-title mx-auto">Pause for thought!</h2>
            <p className="text-center w-full mb-4">{quote.quoteText}</p>
            <div className="flex items-center justify-between">
              <p className="text-sm italic">{quote.quoteAuthor}</p>
              <div className=" badge badge-outline">{quote.quoteGenre}</div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default QuoteCard
