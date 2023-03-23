import React from "react"
import Badge from "../../../../components/article/Badge"
import { formatMinutes } from "../../../../utils/formatMinutes"
import theme from "../../../../utils/theme"

export interface CourseTimeBadgeProps {
  value: number
}

export const CourseTimeBadge = ({ value }: CourseTimeBadgeProps) => {
  return value > 0 ? (
    <Badge color={theme.secondary}>{formatMinutes(value)}</Badge>
  ) : null
}
