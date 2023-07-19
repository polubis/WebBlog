import React from "react"
import Image from "gatsby-image"
import type { AuthorAvatarFixedObject } from "../../models"

interface AuthorAvatarProps {
  avatar: AuthorAvatarFixedObject
}

export default function ({ avatar }: AuthorAvatarProps) {
  return (
    <Image
      className="center circle shadow1 author-avatar"
      alt={avatar.originalName}
      title={avatar.originalName}
      fixed={avatar}
      style={{
        borderRadius: "50%",
        height: avatar.height,
        width: avatar.width,
      }}
    />
  )
}
