import React, { MouseEventHandler, ReactElement } from "react"
import Image from "gatsby-image"
import { AuthorAvatarFixedObject } from "../../models"

interface AuthorAvatarProps {
  className?: string
  avatar: AuthorAvatarFixedObject
  onClick?: MouseEventHandler<HTMLElement>
}

export default function ({
  avatar,
  className = "",
  onClick,
}: AuthorAvatarProps): ReactElement {
  return (
    <Image
      className={`center circle shadow1 author-avatar${className ? " " + className : ""}`}
      onClick={onClick}
      alt={avatar.originalName}
      title={avatar.originalName}
      fixed={avatar}
      style={{
        borderRadius: "50%",
        height: avatar.height,
        width: avatar.width
      }}
    />
  )
}
