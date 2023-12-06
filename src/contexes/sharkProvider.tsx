import { ReactNode, useCallback, useMemo, useReducer, useState } from "react"
import { SharkPart, SharkPartPropertiesKeys } from "../models/Shark"
import { SharkContext, SharkContextType } from "./sharkContext"
import sharkPropertiesReducer, {
  initialStateSharkProperties,
} from "../utils/sharkPropertiesReducer"

export default function SharkProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [properties, dispatch] = useReducer(
    sharkPropertiesReducer,
    initialStateSharkProperties
  )
  const [selectedSharkPart, setSelectedSharkPart] = useState<SharkPart | "">("")

  const getValue = useCallback(
    (partName: SharkPart, propertiesName: SharkPartPropertiesKeys) => {
      const part = properties[partName]
      return part.properties[propertiesName]
    },
    [properties]
  )
  const getSharkIds = useCallback(
    (partName: SharkPart) => {
      return properties[partName].sharks
    },
    [properties]
  )

  const value = useMemo(() => {
    return {
      selectedSharkPart,
      setSelectedSharkPart,
      properties,
      dispatch,
      getValue,
      getSharkIds,
    } satisfies SharkContextType
  }, [getValue, getSharkIds, properties, selectedSharkPart])

  return <SharkContext.Provider value={value}>{children}</SharkContext.Provider>
}
