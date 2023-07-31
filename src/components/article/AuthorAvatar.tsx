import React from "react"
import Image from "gatsby-image"
import type { FixedObject } from "../../v2/core/models"

interface AuthorAvatarProps {
  avatar: FixedObject
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
