import { useState } from "react"
import "./App.css"
import Header from "./components/header/header"
import Navigation from "./components/navigation/navigation"
import PimpMyRequin from "./components/pimpMyRequin/pimpMyRequin"
import SharkChoice from "./components/sharkChoice/charkChoice"

function App() {
  const [activeTab, setActiveTab] = useState(0)

  const changeTab = (newTab: number) => {
    if (newTab < 0 || newTab > 3) return
    setActiveTab(newTab)
  }

  const nextTab = () => {
    setActiveTab((a) => {
      if (a >= 3) return a
      return a + 1
    })
  }
  const previousTab = () => {
    setActiveTab((a) => {
      if (a <= 0) return a
      return a - 1
    })
  }

  return (
    <>
      <Header activeTab={activeTab} />
      <div className="body">
        {activeTab === 0 && <PimpMyRequin />}
        {activeTab === 1 && <SharkChoice />}
      </div>
      <Navigation onNext={nextTab} onPrevious={previousTab} />
    </>
  )
}

export default App
