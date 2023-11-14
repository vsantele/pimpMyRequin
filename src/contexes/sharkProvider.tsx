import { ReactNode, useMemo, useState } from "react"
import { SharkPart } from "../models/Shark"
import { SharkContext, SharkContextType } from "./sharkContext"

export default function SharkProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [selectedSharkPart, setSelectedSharkPart] = useState<SharkPart | "">("")

  const value = useMemo(() => {
    return {
      selectedSharkPart,
      setSelectedSharkPart,
    } satisfies SharkContextType
  }, [selectedSharkPart])

  return <SharkContext.Provider value={value}>{children}</SharkContext.Provider>
}
