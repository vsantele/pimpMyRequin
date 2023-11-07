import { useState } from "react"
import "./App.css"
import Header from "./components/header/header"
import Navigation from "./components/navigation/navigation"
import PimpMyRequin from "./components/pimpMyRequin/pimpMyRequin"

function App() {
  const [activeTab, setActiveTab] = useState(0)

  const changeTab = (newTab: number) => {
    if (newTab < 0 || newTab > 3) return
    setActiveTab(newTab)
  }

  return (
    <>
      <Header activeTab={activeTab} />
      <div className="body">{activeTab === 0 && <PimpMyRequin />}</div>
      <Navigation />
    </>
  )
}

export default App
