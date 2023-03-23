import React, {
  createContext,
  ReactNode,
  useState,
  useMemo,
  useContext,
} from "react"
import { Course } from "../../models"

export interface CourseProviderValue {
  course: Course
}

const Context = createContext<null | CourseProviderValue>(null)

export interface CourseProviderProps {
  initialCourse: Course
  children: ReactNode
}

export const CourseProvider = ({ children, initialCourse }) => {
  const [course] = useState(initialCourse)

  const value: CourseProviderValue = useMemo(
    () => ({
      course,
    }),
    [course]
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useCourseProvider = () => {
  const ctx = useContext(Context)

  if (!ctx) {
    throw Error("Lack of wrapper for provider")
  }

  return ctx
}
