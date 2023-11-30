import { useState, useEffect } from "react"

const useSessionState = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(() => {
    const storedValue = sessionStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : initialValue
  })

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

export default useSessionState
