import React from "react"
import { createRoot } from "react-dom/client"
// import { Provider } from "react-redux"
import App from "./App"
// import { store } from "./store/store"
import "./index.css"
import { setupStore } from "./store/store"
import { Provider } from "react-redux"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  const store = setupStore()

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
