import { ReactNode, useCallback, useMemo, useReducer, useState } from "react"
import {
  SharkPart,
  SharkPartPropertiesKeys,
  sharkPartPropertiesInfo,
} from "../models/Shark"
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

  const [panier, setPanier] = useState<Record<SharkPart, string | null>>(
    Object.keys(sharkPartPropertiesInfo).reduce((acc, part) => {
      acc[part as SharkPart] = null
      return acc
    }, {} as Record<SharkPart, string | null>)
  )

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

  const setPanierPart = useCallback(
    (specie: string) => {
      if (selectedSharkPart === "") return
      setPanier((prev) => {
        return {
          ...prev,
          [selectedSharkPart]: specie,
        }
      })
    },
    [selectedSharkPart]
  )

  const value = useMemo(() => {
    return {
      selectedSharkPart,
      setSelectedSharkPart,
      properties,
      dispatch,
      getValue,
      getSharkIds,
      panier,
      setPanierPart,
    } satisfies SharkContextType
  }, [
    selectedSharkPart,
    properties,
    getValue,
    getSharkIds,
    panier,
    setPanierPart,
  ])

  return <SharkContext.Provider value={value}>{children}</SharkContext.Provider>
}
