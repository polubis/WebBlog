import type { ReactNode } from "react"
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react"

import { logIn, LogInModel } from "./service"

type AuthContext = LogInModel

// Context can be undefined if you forget to use the provider.
const Context = createContext<AuthContext | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

// This will be used to wrap components tree and provide data via context value.
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    // Log in call.
    const handleLogIn = async () => {
      const data = await logIn()
      setAuthorized(data.authorized)
    }

    handleLogIn()
  }, [])

  const value = useMemo(() => ({ authorized }), [authorized])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

// Encapsulation of context and making it black box.
const useAuthContext = () => {
  const ctx = useContext(Context)

  if (!ctx) {
    // A Error for the developer if he forgets to use a provider.
    throw Error("Lack of AuthProvider in components tree")
  }

  return ctx
}

export type { AuthProviderProps, AuthContext }

export { useAuthContext, AuthProvider }
