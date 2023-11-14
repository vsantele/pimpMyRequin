import { createContext, useContext } from "react"
import { SharkPart } from "../models/Shark"

export interface SharkContextType {
  // sharkInfo: SharkInfo
  selectedSharkPart: SharkPart | ""
  // setSharkInfo: React.Dispatch<React.SetStateAction<SharkInfo>>
  setSelectedSharkPart: React.Dispatch<React.SetStateAction<SharkPart | "">>
}

export const SharkContext = createContext<SharkContextType | undefined>(
  undefined
)

export const useSharkContext = () => {
  const context = useContext(SharkContext)
  if (context === undefined) {
    throw new Error("useSharkContext must be used within a SharkProvider")
  }
  return context
}
