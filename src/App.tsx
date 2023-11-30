import { useEffect } from "react"
import "./App.css"
import Header from "./components/header/header"
import Navigation from "./components/navigation/navigation"
import PimpMyRequin from "./components/pimpMyRequin/pimpMyRequin"
import SharkChoice from "./components/sharkChoice/sharkChoice"
import WhereIsMyRequin from "./components/whereIsMyRequin/whereIsMyRequin"
import { useNavigationContext } from "./contexes/navigationContext"
import jingleSrc from "./assets/jingle.mp3"
import useSessionState from "./utils/useSessionState"

function App() {
  const { selectedTab, nextTab, previousTab } = useNavigationContext()

  const [isJinglePlayed, setIsJinglePlayed] = useSessionState(
    "isJinglePlayed",
    false
  )

  useEffect(() => {
    if (!isJinglePlayed) {
      const audio = new Audio(jingleSrc)
      audio.play()
      setIsJinglePlayed(true)
    }
  }, [isJinglePlayed, setIsJinglePlayed])

  return (
    <>
      <Header activeTab={selectedTab} />
      <div className="body">
        {selectedTab === 0 && <PimpMyRequin />}
        {selectedTab === 1 && <WhereIsMyRequin />}
        {selectedTab === 2 && <SharkChoice />}
      </div>
      <Navigation onNext={nextTab} onPrevious={previousTab} />
    </>
  )
}

export default App
