import "./App.css"
import Header from "./components/header/header"
import Navigation from "./components/navigation/navigation"
import PimpMyRequin from "./components/pimpMyRequin/pimpMyRequin"
import SharkChoice from "./components/sharkChoice/sharkChoice"
import WhereIsMyRequin from "./components/whereIsMyRequin/whereIsMyRequin"
import { useNavigationContext } from "./contexes/navigationContext"

function App() {
  const { selectedTab, nextTab, previousTab } = useNavigationContext()

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
