import React, { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"

const publishableKey =
  "pk_test_51OOWCFSFbky3SrYenN7Tk8CyB5usRT3U25RVY84AiUTBmSLfieqd2ygWctEGFriOLG7UHSb9ItYHyFd1c48aPOfG00Bl7cnwfw"

function PaymentPage() {
  const [product, setProduct] = useState({
    name: "Etch Journal App",
    price: 1000, // Updated price
    productOwner: "Your Company Name",
    description:
      "Unlock premium features including better metrics and more storage with Etch Journal App.",
    quantity: 1,
    paymentType: "one-time", // Default payment type
  })

  const makePayment = async () => {
    const stripe = await loadStripe(publishableKey)
    // Include paymentType in the body
    const body = {
      product,
      paymentType: product.paymentType,
    }
    const headers = {
      "Content-Type": "application/json",
    }

    const response = await fetch(
      "http://localhost:3999/api/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    )

    const session = await response.json()

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    })

    if (result.error) {
      console.log(result.error)
    }
  }

  // Function to toggle between one-time and subscription
  const togglePaymentType = () => {
    setProduct({
      ...product,
      paymentType:
        product.paymentType === "one-time" ? "subscription" : "one-time",
    })
  }

  return (
    <div className="flex m-5 self-center">
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
