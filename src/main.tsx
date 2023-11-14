import "leaflet/dist/leaflet.css"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import NavigationProvider from "./contexes/navigationProvider"
import SharkProvider from "./contexes/sharkProvider"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NavigationProvider>
      <SharkProvider>
        <App />
      </SharkProvider>
    </NavigationProvider>
  </React.StrictMode>
)
