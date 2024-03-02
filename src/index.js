// Import necessary libraries and components
import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import configureStore from "./config/configStore"

// Configure the Redux store
const store = configureStore()

// Get the root DOM node where the React app will be mounted
const rootElement = document.getElementById("root")
const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
