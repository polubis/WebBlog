import React from "react"
import { SeniorityLevel } from "../../models/Article"

interface SeniorityBadgeProps {
  level: SeniorityLevel
}

export const SeniorityBadge = ({ level }: SeniorityBadgeProps) => {
  return <span title={level}>{SeniorityLevel[level]}</span>
};

