import React, { memo } from "react"
import type { RateProps } from "./models"

const getRateColor = (value: number): string => {
  const position = (value - 1) / 9

  const red = Math.floor(255 * (1 - position))
  const green = Math.floor(255 * position)
  const blue = 0

  const color = `rgb(${red}, ${green}, ${blue})`

  return color
}

export const Rate = memo(({ rate }: RateProps) => {
  const color = getRateColor(rate)

  return (
    <span
      className="rate"
      style={{
        color,
      }}
    >{`${rate}/10`}</span>
  )
})
