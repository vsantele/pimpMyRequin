import { useEffect, useRef } from "react"
import "./App.css"
import Header from "./components/header/header"
import Navigation from "./components/navigation/navigation"
import PimpMyRequin from "./components/pimpMyRequin/pimpMyRequin"
import SharkChoice from "./components/sharkChoice/sharkChoice"
import WhereIsMyRequin from "./components/whereIsMyRequin/whereIsMyRequin"
import { useNavigationContext } from "./contexes/navigationContext"
import jingleSrc from "./assets/jingle.mp3"
import useSessionState from "./utils/useSessionState"
import Panier from "./components/panier/panier"

function App() {
  const { selectedTab, nextTab, previousTab } = useNavigationContext()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [isJinglePlayed, setIsJinglePlayed] = useSessionState(
    "isJinglePlayed",
    false
  )

  useEffect(() => {
    const audio = audioRef.current
    if (!isJinglePlayed && audio) {
      if (audio.paused) {
        audio.play()
      }
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
        {selectedTab === 3 && <Panier />}
      </div>
      <Navigation onNext={nextTab} onPrevious={previousTab} />
      <audio src={jingleSrc} ref={audioRef} />
    </>
  )
}

export default App
