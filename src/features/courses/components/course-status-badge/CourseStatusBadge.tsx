import React from "react"
import Badge from "../../../../components/article/Badge"
import { CourseStatus } from "../../../../models"
import theme from "../../../../utils/theme"

export interface CourseStatusBadgeProps {
  value: CourseStatus
}

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
