import React from "react"
import { LineYProps } from "../models"

export const LineY = ({ groupIdx, group, setup }: LineYProps) => {
  const height =
    setup.group.padding * 2 +
    setup.item.height * group.items.length +
    setup.item.gap * (group.items.length - 1)
  const top = (group.top ? -1 : 1) * (height / 2 + setup.marker.size / 2)
  const left =
    groupIdx * (setup.marker.gap + setup.marker.size) +
    setup.marker.size / 2 -
    setup.lineY.width / 2

  return (
    <div
      className="line-y"
      style={{
        width: setup.lineY.width,
        transform: `translate(${left}px, ${top}px`,
        height,
        position: "absolute",
        background: "#fff",
        transition: "0.3s transform ease-in-out",
      }}
    />
  )
}
