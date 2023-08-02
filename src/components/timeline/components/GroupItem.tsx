import { GroupItemProps } from "../models"
import React from "react"
import Image from "gatsby-image"
import { Link } from "gatsby"

export const GroupItem = ({
  groupIdx,
  group,
  setup,
  itemIdx,
  item,
}: GroupItemProps) => {
  const top =
    setup.group.padding +
    setup.item.height +
    setup.item.height * itemIdx +
    setup.item.gap * itemIdx

  return (
    <div
      className="timeline-group-item"
      style={{
        display: "flex",
        alignItems: "center",
        position: "absolute",
        transition: "0.3s transform ease-in-out",
        cursor: "pointer",
        height: setup.item.height,
        width: setup.item.width,
        transform: `translate(${
          groupIdx * (setup.marker.gap + setup.marker.size) -
          setup.marker.size / 2
        }px, ${group.top ? `-${top}px` : `${top}px`})`,
        ...{ [group.top ? "top" : "bottom"]: 0 },
      }}
    >
      <Image
        alt={item.title}
        fixed={item.avatar}
        style={{
          borderRadius: "50%",
          height: setup.item.height,
          width: setup.item.height,
          flexShrink: 0,
        }}
      />
      {group.empty || (
        <Link
          to={item.url}
          className="group-item-link"
          style={{
            marginLeft: setup.marker.size / 2 + "px",
            color: "#fff",
            fontFamily: "Lexend, sans-serif",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {item.title}
        </Link>
      )}
    </div>
  )
}
