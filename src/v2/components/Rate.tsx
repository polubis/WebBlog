import React, { memo } from "react"
import type { RateProps } from "./models"
import { getRateColor } from "../utils/getRateColor"

export const Rate = memo(({ rate }: RateProps) => {
  return (
    <span
      style={{
        color: getRateColor(rate),
      }}
    >{`${rate}/10`}</span>
  )
})
