import React from "react"
import type { TimeBadgeProps } from "./models"
import { formatMinutes } from "../../utils/formatMinutes"
import Badge from "../../components/article/Badge"
import theme from "../../utils/theme"

export const TimeBadge = ({ value }: TimeBadgeProps) => {
  return value > 0 ? (
    <Badge color={theme.secondary}>{formatMinutes(value)}</Badge>
  ) : null
}
