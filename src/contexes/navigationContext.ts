import { createContext, useContext } from "react"

export interface NavigationContextType {
  // sharkInfo: SharkInfo
  selectedTab: number
  // setSharkInfo: React.Dispatch<React.SetStateAction<SharkInfo>>
  setSelectedTab: (tab: number) => void
  nextTab: () => void
  previousTab: () => void
}

export const NavigationContext = createContext<
  NavigationContextType | undefined
>(undefined)

export const useNavigationContext = () => {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error(
      "useNavigationContext must be used within a NavigationProvider"
    )
  }
  return context
}
