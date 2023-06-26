import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"

import { Image } from "../../models"

type AvatarSize = "tiny" | "small" | "medium" | "big"

interface Props {
  size?: AvatarSize
  className?: string
  title?: string
  alt?: string
  avatar: Image
  onClick?: React.MouseEventHandler<HTMLElement>
}

const getSize = (size: AvatarSize) => {
  if (size === "tiny") {
    return {
      height: "24px",
      width: "24px",
    }
  }

  if (size === "small") {
    return {
      height: "50px",
      width: "50px",
    }
  }

  if (size === "medium") {
    return {
      height: "92px",
      width: "92px",
    }
  }

  if (size === "big") {
    return {
      height: "200px",
      width: "200px",
    }
  }

  return {
    height: undefined,
    width: undefined,
  }
}

const AuthorAvatar = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.14);
  border-radius: 50%;
`

export default function ({
  avatar,
  className = "",
  title = "User avatar",
  alt = "User avatar",
  size = "small",
  onClick,
}: Props): React.ReactElement {
  return (
    <AuthorAvatar
      onClick={onClick}
      className={`author-avatar${className ? " " + className : ""}`}
    >
      <Img
        alt={alt}
        title={title}
        fluid={avatar}
        style={{
          borderRadius: "50%",
          ...getSize(size),
        }}
      />
    </AuthorAvatar>
  )
}
