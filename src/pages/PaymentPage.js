import React, { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

//FIXME: WORK IN PROGRESS
// const publishableKey = process.env.STRIPE_PUBLIC_KEY
const publishableKey = "123"

function PaymentPage() {

  const [product, setProduct] = useState({
    name: "Etch Journal App",
    price: 1000,
    productOwner: "Your Company Name",
    description:
      "Unlock premium features including better metrics and more storage with Etch Journal App.",
    quantity: 1,
    paymentType: "one-time",
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const makePayment = async () => {
    const stripe = await loadStripe(publishableKey)
    const body = { product }
    const headers = { "Content-Type": "application/json" }

    try {
      const response = await fetch(
        "http://localhost:3999/api/create-checkout-session",
        {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        }
      )
      const session = await response.json()
      const result = await stripe.redirectToCheckout({ sessionId: session.id })

      if (result.error) {
        console.error(result.error.message)
      }
    } catch (error) {
      console.error("Payment error:", error.message)
    }
  }

  const togglePaymentType = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      paymentType:
        prevProduct.paymentType === "one-time" ? "subscription" : "one-time",
    }))
  }

  return (
    <div className="flex flex-col items-center m-5">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://example.com/journal-app-image.jpg"
            alt="Etch Journal App"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p>{product.description}</p>
          <div className="card-actions justify-end">
            <button onClick={makePayment} className="btn btn-primary">
              {product.paymentType === "one-time"
                ? `Buy Now for ₹${product.price}`
                : "Subscribe Monthly"}
            </button>
            <button onClick={togglePaymentType} className="btn btn-secondary">
              {product.paymentType === "one-time"
                ? "Switch to Subscription"
                : "Switch to One-Time Payment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage
