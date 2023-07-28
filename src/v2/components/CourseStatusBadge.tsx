import React from "react"
import Badge from "../../components/article/Badge"
import theme from "../../utils/theme"
import type { CourseStatusBadgeProps } from "./models"

export const CourseStatusBadge = ({ value }: CourseStatusBadgeProps) => {
  if (value === "SHEDULED") {
    return <Badge color={theme.primary}>{value}</Badge>
  }

  if (value === "PENDING") {
    return <Badge color={theme.yellow}>{value}</Badge>
  }

  if (value === "FINISHED") {
    return <Badge color={theme.primary}>{value}</Badge>
  }

  return null
}
