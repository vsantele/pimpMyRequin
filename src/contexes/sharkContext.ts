import { createContext, useContext } from "react"
import { SharkPart, SharkPartPropertiesKeys } from "../models/Shark"
import { SharkPropertiesAction } from "../utils/sharkPropertiesReducer"

export interface SharkContextType {
  // sharkInfo: SharkInfo
  selectedSharkPart: SharkPart | ""
  // setSharkInfo: React.Dispatch<React.SetStateAction<SharkInfo>>
  setSelectedSharkPart: React.Dispatch<React.SetStateAction<SharkPart | "">>
  properties: Record<SharkPart, Record<SharkPartPropertiesKeys, number>>
  dispatch: React.Dispatch<SharkPropertiesAction>
  getValue: (part: SharkPart, property: SharkPartPropertiesKeys) => number
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
