import type { ReactNode } from "react"
import type { CourseStatus } from "../../../core/models"

interface CourseTileProps {
  readTime: number
  status: CourseStatus
  title: string
  description: string
  action: ReactNode
}

export { CourseTileProps }
