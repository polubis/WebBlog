import React, {
  createContext,
  ReactNode,
  useState,
  useMemo,
  useContext,
} from "react"
import { LessonPageContext } from "./models"

export interface LessonProviderValue extends LessonPageContext {}

const Context = createContext<null | LessonProviderValue>(null)

export interface LessonProviderProps extends LessonPageContext {
  children: ReactNode
}

export const LessonProvider = ({
  children,
  ...pageCtx
}: LessonProviderProps) => {
  const [currentValue] = useState(pageCtx)

  const value: LessonProviderValue = useMemo(() => currentValue, [currentValue])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useLessonProvider = () => {
  const ctx = useContext(Context)

  if (!ctx) {
    throw Error("Lack of wrapper for provider")
  }

  return ctx
}
