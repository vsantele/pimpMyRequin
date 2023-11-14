import { ReactNode, useMemo, useState } from "react"
import { NavigationContext, NavigationContextType } from "./navigationContext"

export default function NavigationProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [selectedTab, setSelectedTab] = useState(0)

  const value = useMemo(() => {
    return {
      selectedTab,
      setSelectedTab: (newTab: number) => {
        if (newTab < 0 || newTab > 3) return
        setSelectedTab(newTab)
      },
      nextTab: () => {
        setSelectedTab((a) => {
          if (a >= 3) return a
          return a + 1
        })
      },
      previousTab: () => {
        setSelectedTab((a) => {
          if (a <= 0) return a
          return a - 1
        })
      },
    } satisfies NavigationContextType
  }, [selectedTab])

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}
